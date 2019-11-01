<template>
  <div id="whole">
    <div id="left">
      <p v-for="(v,i) in Goods" :key="i" @click="choose(i)" class="chose">{{v.name}}</p>
    </div>
    <div id="right">
      <ul class="title" v-for="(v,i) in Goods" :key="i" :id="i">
        <span class="t1">{{v.name}}</span>
        <span class="t2">{{v.description}}</span>
        <el-tooltip
          class="item"
          effect="dark"
          :content="v.name+v.description"
          placement="bottom-end"
        >
          <i class="el-icon-more a2"></i>
        </el-tooltip>

        <div id="goods" v-for="(m,n) in Goods[i].foods" :key="n">
          <img :src="'http://elm.cangdu.org/img/'+m.image_path" alt width="60px" class="img1" />
          <div id="detail" @click="goods_detail(m)">
            <span class="p1">{{m.name}}</span>
            <p v-if="m.description" class="p3">{{m.description}}</p>
            <p v-if="m.tips" class="p4">{{m.tips}}</p>
            <span v-if="m.activity != null" class="p5">{{m.activity.image_text}}</span>
            <p class="p6">¥{{danjian[i][n]}}</p>
          </div>
          <span class="p2">招牌</span>

          <span id="p8" v-if="m.specifications.length>0" @click="chooseMask(m,m.specfoods[0].price)">选规格</span>
          <span v-else class="el-icon-circle-plus a4" @click="add(m,i,n)"></span>
          <div id="num" v-show="right_down1[i][n]" v-if="m.specifications.length==0">
            <i class="el-icon-remove a3" @click="reduce(m,i,n)"></i>
            <span class="p7">{{m.__v}}</span>
          </div>
          <div id="numm" v-show="right_down2[i][n]" v-if="m.specifications.length>0">
            <i class="el-icon-remove a33" @click="reduce(m,i,n)"></i>
            <span class="p77">{{m.__v}}</span>
          </div>
        </div>
      </ul>
    </div>

    <!-- 遮罩层 -->
    <div id="mask" v-show="showMask">
      <div class="mask_bg">
        <div class="mask_bg_div1">
          <span class="div1_title">{{msgMask.name}}</span>
          <span class="el-icon-close close" @click="closeMask()"></span>
        </div>
        <div class="mask_bg_div2">
          <p>规格</p>
          <el-button class="btn" v-for="(a,b) in msgMask.specfoods" :key="b">{{a.specs_name}}</el-button>
          <!-- <el-button class="btn">超辣</el-button> -->
        </div>
        <div class="mask_bg_div3">
          <span class="s1">
            ￥
            <span class="s1_s1">{{msgMaskN}}</span>
          </span>
          <el-button type="primary" class="btn" @click="addcar(key, a, b)">加入购物车</el-button>
        </div>
      </div>
    </div>

    <!-- 食物详情页 -->
    <div id="foods_detail" v-show="show1">
      <div id="foodsafe_top">
        <i class="el-icon-arrow-left fan" @click="close()"></i>
        <span class="foodsafe_title">{{msg.name}}</span>
      </div>
      <img :src="'http://elm.cangdu.org/img/'+msg.image_path" width="100%" />
      <div id="foods_more">
        <p class="line1">{{msg.description}}</p>
        <p class="line2">{{msg.name}}</p>
        <p class="line3">
          <span class="line3_l">评分</span>
          <el-rate
            v-model="msg.rating"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            class="line3_r"
          ></el-rate>
        </p>
        <p class="line4">
          <span class="line4_l">月售{{msg.month_sales}}单</span>
          <span class="line4_r" v-for="(a,b) in msg.specfoods" :key="b">售价¥{{a.price}}起</span>
        </p>
        <p class="line5">
          <span>评论数{{msg.rating_count}}</span>
          <span>好评率{{msg.satisfy_rate}}%</span>
        </p>
      </div>
    </div>

    <!-- 底部购物车 -->
    <div id="shop_car">
      <div class="car_left" @click="shows()">
        <div class="car_icon">
          <i class="el-icon-shopping-cart-2"></i>
        </div>
        <p class="car_p1">¥{{mon}}.00</p>
        <p class="car_p2">配送费¥5</p>
      </div>
      <div class="car_right" @click="pay()">还差¥20起送</div>
    </div>
<!-- 购物车清空添加 -->
    <div id="car_detail">
      <div id="carss">
        <div class="cerTop">
          <span class="c1">购物车</span>
          <span class="c2" @click="empty()">
            <i class="el-icon-delete"></i>清空
          </span>
        </div>
        <div v-for="(v,i) in car" :key="i" class="cerContent">
          <span class="c3">{{v.name}}</span>
          <span v-if="v.specfoods[0].price != null" class="c4">¥{{v.specfoods[0].price}}.00</span>
          <div id="num1">
            <i class="el-icon-remove c5" @click="reduce1()"></i>
            <span class="c7">{{v.__v}}</span>
            <i class="el-icon-circle-plus c6" @click="add1()"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "q_store_shop",
  data() {
    return {
      img01: require("./imgs/12.jpg"),
      Goods: [],
      show1: false,
      right_down1: [],
      right_down2: [],
      msg: "",
      showMask: false,
      msgMask:"",
      msgMaskN:"",
      mon:0,
      car:[],
      danjian:[],
      zong:1,
      url:3284,
    };
  },
  created() {
    this.url = this.$route.query.url;
     console.log(this.url)
     this.goods();
  },
  methods: {
    chooseMask(b,n) {
      this.msgMask = b;
      this.msgMaskN = n;
      console.log(b);
      this.showMask = true;
    },
    closeMask() {
      this.showMask = false;
    },
    addcar(key, a, b){
      this.showMask = false;
       this.right_down2[a][b] = true;
    },
    pay() {
       if (this.mon >= 20) {
        this.$router.push({
        path:"/q_store_pay",
        query:{
        data:this.car,
        mun:this.mon,
        shopha:this.shopss,
        }
      });
      };
    },
    goods_detail(a) {
      this.show1 = true;
      this.msg = a;
      console.log(a);
    },
    close() {
      this.show1 = false;
    },
    add(key, a, b) {
      key.__v++;
      this.right_down1[a][b] = true;
      console.log(key.specfoods[0].price);
      this.mon = this.mon + this.danjian[a][b] ;
       if (this.mon >= 20) {
        $(".car_right").css("background-color", "#409eff");
        $(".car_right").html("去结算");
      };
      for (let i = 0; i < this.car.length; i++) {
        if (key.name == this.car[i].name) {
          this.zong = this.danjian[a][b];
          this.car[i].specfoods[0].price =  this.car[i].specfoods[0].price + this.danjian[a][b];
          console.log(this.car[i].specfoods[0].price);
          console.log(this.car);
          return;
        }
        
      }
     
      this.car.push(key);
    },
    reduce(key, a, b) {
      key.__v--;
      if (key.__v == 0) {
        console.log(this.car)
        this.car.$remove(key)
        this.right_down1[a][b] = false;
      }
     this.mon = this.mon - this.danjian[a][b] ;
    },
    goods() {
      const api = "https://elm.cangdu.org/shopping/v2/menu?restaurant_id=" + this.url;
      this.$http({
        url: api,
        method: "get",
        data: {}
      }).then(res => {
        this.Goods = res.data;
        console.log(this.Goods);
        for (var i = 0; i < res.data.length; i++) {
          this.danjian.push([]);
          this.right_down2.push([]);
          this.right_down1.push([]);
          for (var j = 0; j < res.data[i].foods.length; j++) {
            this.danjian[i].push(res.data[i].foods[j].specfoods[0].price);
            this.right_down2[i].push(false);
            this.right_down1[i].push(false);
          }
        }
      });
    },
 
     
 
    choose(a) {
      location.hash = "#" + a;
      $(".chose").css({
        "background-color": "#e6e6e6",
        border: "none"
      });
      $($(".chose")[a]).css({
        "background-color": "white",
        "border-left": "0.5rem solid #409EFF"
      });
    },
    shows() {
      $("#carss").slideDown(500);
    },
    empty() {
      $("#carss").slideUp(200);
      this.car = [];
      this.mon = 0;
      for (let i = 0; i < this.Goods.length; i++) {
        for (let j = 0; j < this.Goods[i].foods.length; j++) {
          this.Goods[i].foods[j].__v = 0;
          console.log(this.Goods[i].foods[j].__v);
           
        }
        
      }
    
    }
  }
};
</script>

<style scoped>
#whole {
  position: relative;
  margin-top: 13rem;
  border: 1px solid green;
}
#left {
  
  width: 10rem;
  font-size: 2rem;
  text-align: center;
  position: fixed;
  height: 45rem;
  top: 18rem;
  overflow: auto;
}
#left > p {
  width: 10rem;
  height: 7rem;
  border-bottom: 0.1rem solid #c0c4cc;
  line-height: 7rem;
  overflow: hidden;
}
.a {
  color: #f56c6c;
}
#right {
  position: fixed;
  top: 18rem;
  height: 45rem;
  left: 10rem;
  overflow: auto;
}
.title {
  width: 27.5rem;
  overflow: hidden;
  position: relative;
}
.t1 {
  font-size: 2rem;
  padding-left: 1rem;
  line-height: 5rem;
}
.t2 {
  font-size: 1.2rem;
  color: #909399;
}
.a2 {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #909399;
}
#goods {
  width: 27.5rem;
  height: 16rem;
  background-color: white;
  border-bottom: 0.1rem solid #c0c4cc;
  padding-top: 1.5rem;
  padding-left: 1rem;
  box-sizing: border-box;
  position: relative;
}
.img1 {
  float: left;
}
#detail {
  padding-left: 1rem;
  float: left;
}
.p1 {
  margin-top: 4rem;
}
.p2 {
  font-size: 0.7rem;
  color: #f56c6c;
  border: 0.1rem solid #f56c6c;
  border-radius: 0.5rem;
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
}
.p3 {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #909399;
}
.p4 {
  margin-top: 1rem;
  font-size: 1.3rem;
  padding-bottom: 1rem;
}
.p5 {
  font-size: 0.7rem;
  color: #f56c6c;
  border: 0.1rem solid #f56c6c;
  border-radius: 0.5rem;
}
.p6 {
  color: orangered;
  margin-top: 2rem;
}
.a3 {
  color: #409eff;
  position: absolute;
  bottom: 2rem;
  right: 5.5rem;
}
.a33 {
  color: #409eff;
  position: absolute;
  bottom: 1.2rem;
  right: 8rem;
}
.a4 {
  color: #409eff;
  position: absolute;
  bottom: 2rem;
  right: 1.5rem;
}
.p7 {
  font-size: 1.5rem;
  position: absolute;
  bottom: 2.2rem;
  right: 3.8rem;
}
.p77 {
  font-size: 1.5rem;
  position: absolute;
  bottom: 1.3rem;
  right: 6.3rem;
}
#p8 {
  width: 4.5rem;
  height: 2rem;
  background-color: #409eff;
  color: white;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1rem;
  text-align: center;
  line-height: 2rem;
  border-radius: 0.5rem;
}

/* 食物详情页 */
#foods_detail {
  width: 37.5rem;
  height: 70rem;
  background-color: white;
  z-index: 200;
  position: fixed;
  top: 0;
}
#foodsafe_top {
  width: 37.5rem;
  height: 4.5rem;
  background-color: #409eff;
  line-height: 4.5rem;
}
#foodsafe_top > .fan {
  width: 10%;
  font-size: 2.5rem;
  color: white;
  margin-top: 1rem;
  text-align: left;
  box-sizing: border-box;
  float: left;
}
.foodsafe_title {
  box-sizing: border-box;
  color: white;
  font-size: 1.8rem;
  text-align: center;
  width: 90%;
  display: inline-block;
  /* float: right; */
}
#foods_more {
  /* border: 0.1rem solid rebeccapurple; */
  padding-left: 1rem;
  padding-top: 1rem;
}
#foods_more > p {
  line-height: 3rem;
}
.line1 {
  color: #606266;
}
.line3_l {
  color: #606266;
}
.line3_r {
  display: inline-block;
}
.line4_l {
  color: #606266;
  font-size: 1.5rem;
}
.line4_r {
  color: orange;
  font-size: 1.5rem;
}
.line5 {
  line-height: 3rem;
  color: #606266;
  font-size: 1.5rem;
}
/* 底部购物车 */
#shop_car {
  width: 37.5rem;
  height: 5rem;
  background-color: blue;
  color: white;
  position: fixed;
  bottom: 0;
  z-index: 300;
}
.car_left {
  width: 25rem;
  height: 5rem;
  background-color: #303133;
  position: absolute;
}
.car_icon {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #303133;
  border: 0.5rem solid #606266;
  position: absolute;
  top: -2rem;
  left: 1.5rem;
  font-size: 4rem;
  text-align: center;
  line-height: 5rem;
}
.car_right {
  width: 12.5rem;
  height: 5rem;
  background-color: #606266;
  color: white;
  text-align: center;
  line-height: 5rem;
  position: absolute;
  right: 0;
}
.car_p1 {
  position: absolute;
  left: 9rem;
  top: 1rem;
}
.car_p2 {
  font-size: 1rem;
  position: absolute;
  left: 9rem;
  bottom: 1rem;
  color: #c0c4cc;
}
#car_detail {
  width: 37.5rem;
  height: 66.7rem;
}
#car_detail > #carss {
  width: 100%;
  position: fixed;
  bottom: 5rem;
  display: none;
}
.cerTop {
  width: 37.5rem;
  height: 4.5rem;
  line-height: 4.5rem;
  background-color: #e4e7ed;
}
.c1 {
  font-size: 1.5rem;
  margin-left: 2rem;
  color: #606266;
}
.c2 {
  margin-left: 24rem;
  font-size: 1.3rem;
  color: #606266;
}
.cerContent {
  width: 37.5rem;
  height: 5.5rem;
  background-color: white;
  border: 0.1rem solid #e4e7ed;
}
.c3 {
  font-size: 1.5rem;
  margin-left: 2rem;
  line-height: 5rem;
}
.c4 {
  color: orangered;
  margin-left: 10rem;
}
#num1 {
  line-height: 4.5rem;
  float: right;
  margin-right: 2rem;
}
.c5,
.c6 {
  color: #409eff;
}

/* 遮罩层 */
#mask {
  width: 37.5rem;
  height: 66.7rem;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;
}
.mask_bg {
  width: 26rem;
  height: 20rem;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10001;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
}
.mask_bg_div1 {
  width: 100%;
  box-sizing: border-box;
  height: 4rem;
  /* background-color:pink; */
  text-align: center;
  line-height: 5rem;
  box-sizing: border-box;
}
.div1_title {
  margin-left: 1rem;
}
.mask_bg_div1 > .close {
  float: right;
  font-size: 2rem;
}
.mask_bg_div2 {
  width: 100%;
  box-sizing: border-box;
  height: 10rem;
  /* background-color:paleturquoise; */
  /* text-align: center; */
  line-height: 5rem;
}
.mask_bg_div2 > p {
  text-align: left;
  height: 4rem;
  line-height: 4rem;
}
.mask_bg_div2 > .btn {
  text-align: left;
  padding: 1rem 1rem;
}
.mask_bg_div3 {
  width: 100%;
  box-sizing: border-box;
  height: 5rem;
  background-color: #f8f8f8;
  line-height: 5rem;
}
.mask_bg_div3 > span {
  color: #ff6000;
  display: inline-block;
  height: 4rem;
  line-height: 4rem;
}
.mask_bg_div3 > .s1 {
  font-size: 1.2rem;
}
.mask_bg_div3 > .s1 > .s1_s1 {
  font-size: 2rem;
  font-weight: 800;
}
.mask_bg_div3 > .btn {
  float: right;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  background-color: #3190e8;
}
</style>