<template>
  <div id="whole">
    <div id="total_score">
      <div class="left">
        <p class="l1">{{totalscore.overall_score|numFilter}}</p>
        <p class="l2">综合评价</p>
        <p class="l3">高于周边商家{{totalscore.compare_rating*100|numFilter}}%</p>
      </div>
      <div class="right">
        <p class="r1">
          <span>服务态度</span>
          <el-rate
            v-model="totalscore.service_score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            class="stars1"
          ></el-rate>
        </p>
        <p class="r2">
          <span>菜品评价</span>
          <el-rate
            v-model="totalscore.food_score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            class="stars2"
          ></el-rate>
        </p>
        <p class="r3">
          送达时间
          <span class="time">{{totalscore.deliver_time}}分钟</span>
        </p>
      </div>
    </div>

    <div id="eveluate">
      <div id="evaluate_kind">
        <span v-for="(v,i) in evaluatekinds" :key="i">
          <el-button
            size="mini"
            type="primary"
            plain
            class="btn"
            v-if="v.unsatisfied==false"
          >{{v.name}}({{v.count}})</el-button>
          <el-button
            size="mini"
            type="info"
            plain
            class="btn"
            v-if="v.unsatisfied==true"
          >{{v.name}}({{v.count}})</el-button>
        </span>
      </div>

      <div id="evaluate_content" v-for="(v,i) in evaluatecontent" :key="i">
        <img :src="'//elm.cangdu.org/img/default.jpg'" width="40px" class="headImg" v-if="!v.avatar">
        <img :src="'https://fuss10.elemecdn.com/'+v.avatar" width="40px" class="headImg" v-else/>
        <div class="center">
          <p class="name">{{v.username}}</p>
          <p class="cons r1">
            <el-rate
              v-model="v.rating_star"
              disabled
              show-score
              text-color="#ff9900"
              score-template
              class="stars1"
            ></el-rate>
            {{v.time_spent_desc}}
          </p>
          <!-- "https://fuss10.elemecdn.com/0/74/e0e203f613deff4e456c31e4177d1jpeg.jpeg" -->
          <img v-show="m.image_hash" :src="'https://fuss10.elemecdn.com/'+m.image_hash+'.jpeg'"  width="70px"  
            v-for="(m,n) in evaluatecontent[i].item_ratings" :key="n" />
          <p class="detail">
            <span v-for="(m,n) in evaluatecontent[i].item_ratings" :key="n">{{m.food_name}}</span>
          </p>
        </div>
        <p class="date">{{v.rated_at}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "q_store_evaluate",
  data() {
    return {
      totalscore: [],
      evaluatekinds: [],
      evaluatecontent: [],
      img01: require("./imgs/12.jpg")
    };
  },
  created() {
    this.totalScore();
    this.evaluateKind();
    this.evaluateContent();
  },
  methods: {
    totalScore() {
      const api = "https://elm.cangdu.org/ugc/v2/restaurants/1/ratings/scores";
      this.$http({
        url: api,
        method: "get",
        data: {}
      }).then(res => {
        console.log(res);
        this.totalscore = res.data;
        console.log(this.totalscore);
        this.totalscore.service_score = this.totalscore.service_score.toFixed(
          1
        );
        this.totalscore.food_score = this.totalscore.food_score.toFixed(1);
      });
    },
    evaluateKind() {
      const api = "https://elm.cangdu.org/ugc/v2/restaurants/3284/ratings/tags";
      this.$http({
        url: api,
        method: "get",
        data: {}
      }).then(res => {
        console.log(res);
        this.evaluatekinds = res.data;
        console.log(this.evaluatekinds);
      });
    },
    evaluateContent() {
      const api =
        "https://elm.cangdu.org/ugc/v2/restaurants/3284/ratings?offset=0&limit=10";
      this.$http({
        url: api,
        method: "get",
        data: {}
      }).then(res => {
        console.log(res);
        this.evaluatecontent = res.data;
        console.log(this.evaluatecontent);
      });
    }
  },

  filters: {
    numFilter(value) {
      let realVal = parseFloat(value).toFixed(1);
      return realVal;
    }
  }
};
</script>

<style scoped>
#whole {
  position: relative;
  margin-top: 13rem;
}
#total_score {
  width: 37.5rem;
  height: 10rem;
  background-color: white;
  position: absolute;
  top: 5rem;
  /* border-top: 0.1rem solid #c0c4cc; */
}
.left {
  width: 15rem;
  height: 10rem;
  text-align: center;
}
.l1 {
  font-size: 3rem;
  color: orange;
  margin-top: 1.5rem;
}
.l2 {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}
.l3 {
  font-size: 1.2rem;
  color: #909399;
  margin-top: 0.5rem;
}
.right {
  width: 22rem;
  height: 10rem;
}
.r1 {
  margin-top: 1.5rem;
  transform: scale(0.8, 0.8) translateX(-3rem);
}
.r2 {
  margin-top: 0.5rem;
  transform: scale(0.8, 0.8) translateX(-3rem);
}
.r3 {
  margin-top: 0.5rem;
  transform: scale(0.8, 0.8) translateX(-3rem);
}
.stars1 {
  display: inline;
}
.stars2 {
  display: inline;
}
.time {
  color: #909399;
  font-size: 1.2rem;
}
#eveluate {
  position: absolute;
  top: 16rem;
}
#evaluate_kind {
  width: 37.5rem;
  background-color: white;
  border-bottom: 0.1rem solid #c0c4cc;
}
.btn {
  margin: 0.5rem;
  font-size: 1rem;
}
#evaluate_content {
  width: 37.5rem;
  background-color: white;
  border-bottom: 0.1rem solid #c0c4cc;
  overflow: hidden;
  position: relative;
}
.headImg {
  border-radius: 50%;
  /* border: 0.1rem solid red; */
  margin: 1.5rem;
  float: left;
}
.center {
  float: left;
}

.name {
  margin-top: 1.5rem;
}
.cons {
  margin-top: 1rem;
  font-size: 1.3rem;
}
.detail {
  margin-top: 1rem;
}
.detail > span {
  width: 4rem;
  height: 1.8rem;
  border: 0.1rem solid #c0c4cc;
  display: inline-block;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  margin-right: 1rem;
  color: #909399;
  border-radius: 10%;
}
.date {
  font-size: 1.2rem;
  color: #909399;
  position: absolute;
  top: 1.5rem;
  right: 1rem;
}
</style>>

