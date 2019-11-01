<template>
  <div id="whole">
    <div
      id="top"
      :style="{background:'url(http://elm.cangdu.org/img/'+shopMessage.image_path+')',backgroundSize:'cover'}"
    >
      <div class="black">
        <div id="left">
          <img :src="'http://elm.cangdu.org/img/'+shopMessage.image_path" width="70px" />
        </div>
        <div id="right">
          <p class="line1">{{shopMessage.name}}</p>
          <span class="line2">商家配送/分钟送达/配送费¥{{shopMessage.float_delivery_fee}}</span>
          <i class="el-icon-arrow-right i1" @click="open1()"></i>
          <p class="line3">公告:{{shopMessage.promotion_info}}</p>
          <!--11、餐馆详情  https://elm.cangdu.org/shopping/restaurant/3284 -->
        </div>
        <div class="bottom" v-if="off > 0">
          <span class="label">{{shopMessage.activities[0].icon_name}}</span>
          <span class="bot1">{{shopMessage.activities[0].description}}（APP专享）</span>
          <span class="bot2">1个活动</span>
          <i class="el-icon-arrow-right i2" @click="open()"></i>
        </div>
        <div class="bottom" v-else></div>
      </div>
    </div>

    <!-- 店铺信息详情页 -->
    <div id="store_detail" v-show="show1">
      <div id="detail_top">
        <i class="el-icon-arrow-left t1" @click="close1()"></i>
        <span class="title">商家详情</span>
      </div>
      <div id="first">
        <p class="first_p1">活动与属性</p>
        <p class="first_p2" v-for="(a,b) in shopMessage.activities" :key="b">
          <span class="p2_l" :style="{backgroundColor:'#'+a.icon_color}">{{a.icon_name}}</span>
          <span class="p2_r">{{a.description}}（APP专享）</span>
        </p>
        <p class="first_p3" v-for="(v,i) in shopMessage.supports" :key="i">
          <span class="p3_l" :style="{backgroundColor:'#'+v.icon_color}">{{v.icon_name}}</span>
          <span class="p3_r">{{v.description}}（APP专享）</span>
        </p>
      </div>
      <div id="second">
        <p class="second_p1">
          <span class="p1_left">食品监督安全公示</span>
          <span class="p1_right">
            企业认证详情
            <i class="el-icon-arrow-right" @click="open2()"></i>
          </span>
        </p>
        <div class="second_p2">
          <div class="p2_left"></div>
          <div class="p2_right">
            <span class="r_span1">监督检查结果:</span>
            <span class="r_span2">良好</span>
            <p class="r_p2">检查日期:</p>
          </div>
        </div>
      </div>
      <div id="third">
        <p class="tp1">商家信息</p>
        <div id="more">
          <p>{{shopMessage.name}}</p>
          <p>地址:{{shopMessage.address}}</p>
          <p>营业时间:[{{a}}]</p>
          <p>
            营业执照
            <i class="el-icon-arrow-right ic1"></i>
          </p>
          <p>
            餐饮服务许可证
            <i class="el-icon-arrow-right ic2"></i>
          </p>
        </div>
      </div>
    </div>

    <!-- 食品监督安全公示 -->
    <div id="foodsafe" v-show="show2">
      <div id="foodsafe_top">
        <i class="el-icon-arrow-left fan" @click="close2()"></i>
        <span class="foodsafe_title">食品监督安全公示</span>
      </div>
      <div id="second2">
        <p class="second_p1">食品监督安全公示</p>
        <div class="second_p2">
          <div class="p2_left"></div>
          <div class="p2_right">
            <span class="r_span1">监督检查结果:</span>
            <span class="r_span2">良好</span>
            <p class="r_p2">检查日期:</p>
          </div>
        </div>
      </div>
    <div id="third">
         <p class="tp1">工商登记信息</p>
         <div id="more2">
         <p>企业名称</p>
         <p>工商执照注册号</p>
         <p>注册资本</p>
         <p>注册地址</p>
         <p>属地监管所</p>
         <p>法定代表人</p>
         <p>经营范围</p>
         </div>
    </div>
   <div id="third">
         <p class="tp1">餐饮许可证</p>
         <div id="more2">
         <p>营业范围</p>
         <p>许可证有效期</p>
         <p>许可证号</p>
         <p>发证时间</p>
         <p>发证机关</p>
         </div>
    </div>
 
   <div id="book">
      <p class="bookT">许可证书</p>
       <img :src="'//elm.cangdu.org/img/default.jpg'" width="150px">
       <img :src="'//elm.cangdu.org/img/default.jpg'" width="150px">
   </div>

    </div>

    <!-- 店铺活动页 -->
    <div id="store_activity" v-show="show">
      <p class="act_name">{{shopMessage.name}}</p>
      <el-button type="info" round class="act_btn1">优惠信息</el-button>
      <span class="span1">{{shopMessage.activities[0].icon_name}}</span>
      <span class="span2">{{shopMessage.activities[0].description}}（APP专享）</span>
      <el-button type="info" round class="act_btn2">商家公告</el-button>
      <p class="act_p">{{shopMessage.promotion_info}}</p>
      <div id="close">
        <i class="el-icon-close" @click="close()"></i>
      </div>
    </div>
    <div id="center">
      <span class="shop" @click="jump1()">商品</span>
      <span class="evaluate" @click="jump2()">评价</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "q_store",
  data() {
    return {
      url:null,
      img01: require("./imgs/12.jpg"),
      shopMessage: "",
      show: false,
      show1: false,
      show2: false,
      a:"",
      off:"",
      shop:[],

    };
  },
  created() {
    this.shop = this.$route.query.data;
    this.url = this.$route.query.data.id;
    this.off = this.shop.activities.length;
    console.log(this.shop);
    console.log(this.url);
     console.log(this.off);
    this.shop_message();
    this.jump1();
  },
  methods: {
    jump1() {
      this.$router.push({
        name: "q_store_shop",
        query:{
          shops:this.shop,
          url:this.url
        }
      });
    },
    jump2() {
      this.$router.push({
        name: "q_store_evaluate"
      });
    },
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    open1() {
      this.show1 = true;
    },
    close1() {
      this.show1 = false;
    },
    open2() {
      this.show2 = true;
    },
    close2() {
      this.show2 = false;
    },
    shop_message() {
      const api = "https://elm.cangdu.org/shopping/restaurant/" + this.url;
      this.$http({
        url: api,
        method: "get",
        data: {}
      }).then(res => {
        console.log(res);
        this.shopMessage = res.data;
        console.log(this.shopMessage);
        this.a = res.data.opening_hours[0]
        console.log(this.a);
      });
    }
  }
};
</script>

<style scoped>
#whole {
  position: relative;
}
#top {
  width: 37.5rem;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 200;
}
.black {
  width: 37.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  padding-bottom: 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
}
#left {
  float: left;
  margin-right: 1.5rem;
}
.line1 {
  color: white;
  font-weight: bold;
  padding-bottom: 1rem;
  margin-left: 5rem;
}
.line2 {
  color: white;
  font-size: 1.2rem;
}
.line3 {
  color: white;
  font-size: 1.2rem;
  padding-top: 1rem;
}
.i1 {
  font-size: 2.5rem;
  color: white;
  position: absolute;
  right: 0.8rem;
}
.bottom {
  float: left;
  margin-top: 1rem;
}
.label {
  font-size: 1.2rem;
  background-color: #f07373;
  color: white;
}
.bot1 {
  font-size: 1.2rem;
  color: white;
}
.bot2 {
  font-size: 1.2rem;
  color: white;
  margin-left: 9rem;
}
.i2 {
  color: white;
}
#center {
  width: 37.5rem;
  height: 5rem;
  background-color: white;
  color: white;
  font-size: 1.5rem;
  line-height: 5rem;
  text-align: center;
  position: absolute;
  top: 12.8rem;
  position: fixed;
  z-index: 200;
  border-bottom: 0.1rem solid #c0c4cc;
}
.shop {
  padding-right: 6rem;
  color: #606266;
}
.evaluate {
  padding-left: 6rem;
  color: #606266;
}
/* 店铺活动页 */
#store_activity {
  width: 37.5rem;
  height: 67rem;
  background-color: #303133;
  position: fixed;
  top: 0;
  z-index: 500;
}
#close {
  width: 6rem;
  height: 6rem;
  border: 0.15rem solid #909399;
  border-radius: 50%;
  color: #909399;
  font-size: 2rem;
  text-align: center;
  line-height: 6rem;
  position: absolute;
  bottom: 4rem;
  left: 16.5rem;
}
.act_name {
  width: 37.5rem;
  text-align: center;
  font-size: 2rem;
  color: white;
  position: absolute;
  top: 3rem;
}
.act_btn1 {
  position: absolute;
  top: 13rem;
  left: 14.5rem;
}
.span1 {
  width: 2rem;
  height: 2rem;
  background-color: #f07373;
  border-radius: 10%;
  color: white;
  text-align: center;
  position: absolute;
  top: 20rem;
  left: 3rem;
}
.span2 {
  color: white;
  position: absolute;
  top: 20rem;
  left: 6rem;
}
.act_btn2 {
  position: absolute;
  top: 27rem;
  left: 14.5rem;
}
.act_p {
  color: white;
  position: absolute;
  top: 33rem;
  left: 3rem;
}
/* 店铺信息详情页 */
#store_detail {
  width: 37.5rem;
  height: 68rem;
  background-color: #dcdfe6;
  position: fixed;
  top: 0;
  z-index: 500;
  overflow: auto;
}

#detail_top {
  width: 37.5rem;
  height: 4.5rem;
  background-color: #409eff;
  line-height: 4.5rem;
}
.t1 {
  font-size: 2.5rem;
  color: white;
  margin-left: 0.5rem;
  margin-top: 1rem;
}
.title {
  color: white;
  font-size: 1.8rem;
  margin-left: 12rem;
}
#first {
  width: 37.5rem;
  height: 24rem;
  background-color: white;
  margin-top: 1rem;
}
.first_p1 {
  width: 37.5rem;
  height: 5rem;
  line-height: 5rem;
  border-bottom: 0.1rem solid #dcdfe6;
  padding-left: 1rem;
}
.p2_l,
.p3_l,
.p4_l,
.p5_l {
  width: 2rem;
  height: 2rem;
  border-radius: 10%;
  color: white;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.3rem;
}
.p2_r,
.p3_r,
.p4_r,
.p5_r {
  font-size: 1.3rem;
  color: #606266;
}
.first_p2,
.first_p3 {
  line-height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.first_p2 {
  margin-top: 1.5rem;
}
#second {
  width: 37.5rem;
  height: 15rem;
  background-color: white;
  margin-top: 1rem;
}
.second_p1 {
  width: 37.5rem;
  height: 5rem;
  line-height: 5rem;
  border-bottom: 0.1rem solid #dcdfe6;
  padding: 0 1rem;
}
.p1_right {
  color: #909399;
  margin-left: 10rem;
}
.second_p2 {
  padding: 1.5rem;
}
.p2_left {
  width: 6rem;
  height: 6rem;
  background-color: green;
  border-radius: 50%;
  text-align: center;
  line-height: 6rem;
  float: left;
}
.p2_right {
  float: left;
  padding-left: 3rem;
  /* border: 0.1rem solid #909399; */
  padding-top: 1rem;
}
.r_span1 {
  color: #606266;
  font-size: 1.3rem;
}
.r_span2 {
  font-size: 1.3rem;
  color: green;
  margin-left: 1.5rem;
}
.r_p2 {
  color: #606266;
  font-size: 1.3rem;
  line-height: 5rem;
}
#third {
  width: 37.5rem;
  background-color: white;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.tp1 {
  line-height: 3rem;
  border-bottom: 0.1rem solid #dcdfe6;
  padding: 1rem;
}
#more > p {
  line-height: 3.5rem;
  color: #606266;
  border-bottom: 0.1rem solid#DCDFE6;
  padding: 1rem;
  font-size: 1.3rem;
}
.ic1,
.ic2 {
  float: right;
  line-height: 3.5rem;
  margin-right: 1rem;
  font-size: 2rem;
  color: #909399;
}

/* 食品监督安全公示 */
#foodsafe {
  width: 37.5rem;
  height: 68rem;
  background-color: #dcdfe6;
  position: fixed;
  top: 0;
  z-index: 600;
  overflow: auto;
}
#foodsafe_top {
  width: 37.5rem;
  height: 4.5rem;
  background-color: #409eff;
  line-height: 4.5rem;
}
.fan {
  font-size: 2.5rem;
  color: white;
  margin-left: 0.5rem;
  margin-top: 1rem;
}
.foodsafe_title {
  color: white;
  font-size: 1.8rem;
  margin-left: 8.5rem;
}
#second2 {
  width: 37.5rem;
  height: 15rem;
  background-color: white;
}
#more2 > p {
  line-height: 1.5rem;
  color: #606266;
  padding: 1rem;
  font-size: 1.3rem;
  padding-left: 2rem;
}
#book{
  width: 37.5rem;
  height: 30rem;
  background-color: white;
  margin-top: 1rem;
  padding: 2rem;
}
.bookT{
  line-height: 4rem;
  margin-left: 2rem;
}
</style>>

