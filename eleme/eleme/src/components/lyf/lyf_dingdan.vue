<template>
  <div id="app">
     <div id="toubu">
        <i @click="hui()" class="el-icon-arrow-left el1"></i>
        <span id="dizhi">
            订单详情
        </span>
       
      </div>
      <div id="xiang">
          <ul>
              <li class="lis" v-for="(v,i) in dingdanli" :key="i">
                  <div class="imgs">
                      <img :src="'//elm.cangdu.org/img/' + v.restaurant_image_url" alt="">
                  </div>
                  <p class="names">
                      {{v.restaurant_name}}
                      <i class="el-icon-arrow-right"></i>
                      <span class="title">{{v.status_bar.title}}</span><br>
                      <span class="text">{{v.formatted_created_at}}</span>
                  </p>
                  <p class="shangpin">
                      <span>{{v.basket.group[0][0].name}} 等等{{v.basket.group.length}}件商品</span>
                     <span class="qian">¥{{v.basket.packing_fee.price}}.00</span>
                  </p>
                  <p class="zaila">
                      <span>再来一单</span>
                  </p>
              </li>
          </ul>
      </div>
      <div id="dibu">
          <ul id="ul2">
              <li @click="shouye()">
                  <i class="el-icon-eleme"></i>
                  <p>外卖</p>
              </li>
              <li @click="shopsousuo()"> 
                  <i class="el-icon-discover"></i>
                  <p>搜索</p>
              </li>
              <li id="waimai">
                  <i class="el-icon-tickets"></i>
                  <p>订单</p>
              </li>
              <li @click="wode()">
                 <i class="el-icon-user"></i>
                 <p>我的</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>

export default {
name:"Lyf_dingdan",
data() {
    return {
        dingdanli:[],

    }
},
created() {
    this.dingdan();
},
methods: {
    dingdan(){
        const api = "https://elm.cangdu.org/bos/v2/users/41596/orders?limit=4&offset=0";
        this.$http({
            url:api,
            method:"get",
            withCredentials:true,//默认为false
            data:{
           }
        }).then(res=>{
            this.dingdanli = res.data;
            console.log(this.dingdanli)
        });
    },
    hui(){
            this.$router.go(-1)
        },
        shopsousuo(){
        this.$router.push({
        path:"/lyf_shopsousuo",
        query:{
        }
      }); 
        },
        shouye(){
        this.$router.push({
        path:"/lyf_shouye",
        query:{
        }
      }); 
        },
        wode(){
        this.$router.push({
        path:"./minindex",
        query:{
            
        }
      }); 
        }
        
},

}

</script>

<style scoped>
#app{
  overflow: hidden;
  background-color: #e4e4e4;
}
ul{
     background-color: #e4e4e4;
}
div,li {
  background-color: #ffffff;
}
    #toubu{
    background-color: #3190e8;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 4.57rem;
    }
    .el1{
        margin-top: 0.4rem;
        font-size: 3.5rem;
        color: #f5f5f5;
    }
    #dizhi{
    font-size: 1.875rem;
    color: #fff;
    text-align: center;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    color: #fff;
    text-align: center;
    }
    #dibu,#dibutianchong{
    width: 37.5rem;
    height: 4.5rem;
}
/* 订单列表 */
#xiang{
    margin-top: 5rem;
    margin-bottom: 7rem;
}
.lis{
    width: 34.5rem;
    height: 15.1rem;
    margin-top: 1rem;
    padding: 1.5rem;
}
.lis>p {
    margin-left: 7rem;
    margin-top: 0.6rem;
}
.imgs{
    float: left;
}
.names{
    font-size: 1.7rem;
    color: #333;
    font-weight: 400;
    font-family: Helvetica Neue,Tahoma,Arial;
}
.title{
    float: right;
    margin-right: 0.9rem;
    font-size: 1.4rem;
}
.imgs>img{
    width: 5rem;
}
.text{
    color: #666666;
    font-size: 1.4rem;
}
.shangpin{
    height: 4.6rem;
    line-height: 4.6rem;
    color: #666666;
    font-size: 1.3rem;
}
.qian{
    margin-right: 0.9rem;
    float: right;
    color: #ff6600;
    font-size: 1.4rem;
}
.zaila{
    float: right;
    margin-right: 0.7rem;
    padding-top: 1rem;
    font-size: 1.3rem;
    color: #3190e8;
}
.zaila>span{
    display: inline-block;
    padding: 0.6rem;
    border: 0.04rem solid #3190e8;
    border-radius: 0.5rem;
}
#dibu{
    width: 37.5rem;
    position: fixed;
    bottom: 0rem;
    
}
#ul2{
    background-color: #ffffff;
}
#dibu i {
    font-size: 2rem;
}
#dibu>ul>li{
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    width: 24%;
    height: 4.5rem;
    text-align: center;
    fill: #ccc;
    padding-top: 0.4rem;
}
#dibu>ul p{
    font-size: 1.3rem;
    color: #666666;
    height: 2rem;
    line-height: 2rem;
}
#app #dibu>#ul2>#waimai>p,#app #dibu>#ul2>#waimai{
    color: #3190e8;
}
</style>