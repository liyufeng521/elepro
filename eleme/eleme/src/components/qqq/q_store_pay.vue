<template>
  <div id="whole">
      <div id="top">
      <i class="el-icon-arrow-left icon1" @click="goback()"></i>
      <span class="confirm">确认订单</span>
      <i class="el-icon-user icon2"></i>
    </div>
    <div id="user">
        <i class="el-icon-location-outline icon3"></i>
        <div class="center">
            <p class="usermsg1">
                <span class="username">李哈哈</span>
                <span class="sex">先生</span>
                <span class="tel">12345678910</span>
            </p>
            <p class="usermsg2">
                 <span class="label">公司</span>
                 <span class="address">学校函数二楼</span>
            </p>
        </div>
        <i class="el-icon-arrow-right icon4" @click="choseaddress()"></i>
    </div>
    <div id="bor"></div>
    <div id="arrivetime">
        <span class="time">送达时间</span>
        <div class="right">
        <p class="yuji">尽快送达 | 预计19:46</p>
        <p class="bird">蜂鸟专送</p>
        </div>
    </div>
     <div id="first">
         <p class="paymethod">
             <span class="m1">支付方式</span>
             <span class="m2">在线支付</span>
             <i class="el-icon-arrow-right icon5"></i>
         </p>
         <p class="red">
             <span class="r1">红包</span>
             <span class="r2">暂时只在饿了么APP中支持</span>
         </p>
     </div>
     <div id="second">
         <p class="con1"> <img :src="'http://elm.cangdu.org/img/'+this.headA.image_path" width="40px" />
             <span class="text1">{{this.headA.name}}</span>
         </p>
         <div class="content">
             <p class="con2" v-for="(v,i) in last" :key="i">
                 <span>{{v.name}}</span>
                   <span class="text3">¥{{v.specfoods[0].price}}</span>
                   <span class="text2">x{{v.__v}}</span>
             </p>
             <p class="con3">
                 <span>餐盒</span>
                  <span class="text4">¥83</span>
             </p>
             <p class="con4">
                 <span>配送费</span>
                  <span class="text5">¥4</span>
             </p>
         </div>
         <div class="waiting">
               <p class="con5">
                   <span>订单 ¥{{zong+83+4}}</span>
                   <span class="text6">待支付</span>
               </p>
               <p class="con6" >¥{{zong+83+4}}</p>
         </div>
     </div>
      <div id="third">
         <p class="more">
             <span class="ml1">订单备注</span>
             <span class="ml2">口味、偏好</span>
             <i class="el-icon-arrow-right ml3"></i>
         </p>
          <p class="more">
             <span class="ml1">发票抬头</span>
             <span class="ml4">不需要开发票</span>
             <i class="el-icon-arrow-right ml3"></i>
         </p>
     </div>

    <div id="fouth">
         <div class="fouth_l">待支付<span> ¥{{zong+83+4}}</span></div>
         <div class="fouth_r">确认下单</div>
    </div>


  </div>
</template>

<script>
export default {
name:"q_store_pay",
data() {
    return {
         img01: require("./imgs/12.jpg"),
         last:null,
         zong:0,

    }
},
created() {
    this.last = this.$route.query.data;
    this.zong = this.$route.query.mun;
    this.headA=this.$route.query.shopha;
    console.log(this.last);
    console.log(this.zong);
    console.log(this.headA);
},
methods: {
goback(){
            this.$router.go(-1)
        },
choseaddress(){
        this.$router.push({
        name: "q_pay_chooseAds"
      });
    },
}

}
</script>

<style scoped>
#top {
  width: 37.5rem;
  height: 4.5rem;
  background-color: #409eff;
}
.icon1{
    font-size: 2.5rem;
    color: white;
    line-height: 4.5rem;
    padding-left: 1rem;
}
.confirm{
    font-size: 2rem;
    color: white;
    margin-left: 11rem;
    line-height: 4.5rem;
}
.icon2{
    font-size: 2.5rem;
    color: white;
    line-height: 4.5rem;
    margin-left: 10.5rem;
}
#user{
  width: 37.5rem;
  height: 8rem;
  background-color: white;
}
.icon3{
    color: #409eff;
    font-size: 2rem;
     float: left;
     margin-left: 3rem;
     margin-top: 3rem;
}
.center{
    float: left;
     margin-left: 2rem;
     margin-top: 2rem;
}
.center>p{
    line-height: 2rem;
}
.icon4{
    float: left;
     margin-top: 3rem;
      margin-left: 8rem;
      font-size: 2rem;
}
.username{
    font-size: 1.8rem;
}
.sex,.tel,.address{
color: #606266;
font-size: 1.4rem;
}
.label{
color: white;
font-size: 1.4rem;
background-color: rgb(44, 238, 93);
}
#bor{
    width: 37.5rem;
    height:0.3rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=) 0 100% repeat-x;
}
#arrivetime{
   width: 37.5rem;
   height: 10rem;
   background-color: white;
   border-left: 0.8rem solid #409eff;
   margin-top: 2rem;
    box-sizing: border-box;
}
.time{
    font-size: 1.8rem;
    margin-left: 2rem;
    margin-top: 4rem;
    float: left;
}
.right{
    float: right;
    margin-right: 2.5rem;
    margin-top: 2.5rem;
}
.yuji{
    color: #409eff;
     padding-bottom: 1rem;
}
.bird{
color: white;
font-size: 1.2rem;
background-color:#409eff;
padding: 0.3rem;
border-radius: 10%;
 display: inline-block;

}
#first{
    width: 37.5rem;
   height: 10rem;
   background-color: white;
   margin-top: 2rem;
   line-height: 5rem;
    color: #909399;
   
}
.paymethod{
    border-bottom: 0.1rem solid #EBEEF5;
     padding-left: 2rem;
}
.m1{
    color: black;
}
.m2{
    margin-left: 20rem;
    font-size: 1.4rem;
}
.red{
     padding-left: 2rem;
     font-size: 1.4rem;
}
.r2{
     margin-left: 14rem;
}
#second{
    width: 37.5rem;
   /* height: 20rem; */
   background-color: white;
   margin-top: 2rem;
}
.con1{
    line-height: 5rem;
     border-bottom: 0.1rem solid #EBEEF5;
     /* padding-top:1rem;  */
}
.con1>img{
    margin-left: 2rem;
}
.con2,.con3,.con4,.con5,.con6{
    line-height: 5rem;
    color: #606266;
    padding-left: 2rem;
}
.con5{
    border-top: 0.1rem solid #EBEEF5;
}
.con6{
     margin-left: 28.8rem;
     color: orangered;
}
.text2{
    float: right;
    margin-right: 2rem;
    color: orangered;
}
.text3{
   float: right;
    margin-right: 2rem;
}
.text4{
      margin-left: 27rem;
}
.text5{
      margin-left: 26rem;
}
.text6{
    float: right;
    margin-right: 2rem;
     color: orangered;
}
#third{
      width: 37.5rem;
   height: 10rem;
   background-color: white;
   margin-top: 2rem;
   line-height: 5rem;
    color: #909399;
    padding-bottom: 5rem;
}
.more{
     border-bottom: 0.1rem solid #EBEEF5;
     padding-left: 2rem;
}
.ml1{
    color: #606266;
}
.ml2{
    font-size: 1.4rem;
    margin-left: 18rem;
}
.ml4{
    font-size: 1.4rem;
    margin-left: 16.5rem;
}
#fouth{
    width: 37.5rem;
    height: 5rem;
    /* margin-top: 2rem; */
    color: white;
    background-color: rgb(44, 238, 93);
    line-height: 5rem;
    position: fixed;
    bottom: 0;
}
.fouth_l{
    width: 25rem;
    height: 5rem;
    background-color: #303133;
    float: left;
    padding-left: 2rem;
}
.fouth_r{
    text-align: center;
}
</style>