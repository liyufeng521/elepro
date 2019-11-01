<template>
  <div id="app">
       <div id="toubu">
        <i @click="shopsousuo()" class="el-icon-search el1"></i>
        <span @click="dz_tz()" id="dizhi">
            {{name}}
        </span>
        <i class="el-icon-user el2"></i>
      </div>
      <div id="lunbo">
          <div id="dian">
              <span class="yuandian1"></span><span class="yuandian2"></span>
          </div>
          <!-- <swiper :options="swiperOption" ref="mySwiper"> -->
              <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
   
 
        <swiper-slide >
            <ul>
                <li @click="pai(v)" class="lis" :key="i" v-for="(v,i) in swiperImgs1">
                    <img class="img1" :src="'https://fuss10.elemecdn.com' + v.image_url">
                    <p v-text="v.title"></p>
                </li>
            </ul>
        </swiper-slide>
        <swiper-slide >
            <ul>
                <li @click="pai(v)" :key="i" v-for="(v,i) in swiperImgs2">
                    <img class="img1" :src="'https://fuss10.elemecdn.com' + v.image_url">
                    <p v-text="v.title"></p>
                </li>
            </ul>
        </swiper-slide>
 <div class="swiper-pagination"  slot="pagination"></div>
         </swiper>
      </div>
      <!-- 商铺列表 -->
      <div id="shop">
            <p id="fujin"><i class="el-icon-s-shop"></i>附近商家</p>
            <ul>
                <li @click="shopto(v)" :key="i" v-for="(v,i) in shopp" class="shang">
                    <img class="shangtu" :src="'http://elm.cangdu.org/img/' + v.image_path" >
                    <p class="shang_1">
                        <span class="pin">品牌</span>
                    <span class="shang_name">{{v.name}}</span>
                     
                    
                    </p>
                      <span class="bao">
                            <span class="baozhunpiao" :key="h" v-for="(j,h) in v.supports">{{j.icon_name}}</span>
                       </span>
                    <p class="shang_2">
                        <span class="suo">
                            <el-rate
                    v-model="v.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    class="xing"
                    score-template="{value}">
                    
</el-rate>
                    <span>月售{{v.recent_order_num}}单</span>
                        </span>
                        
                   
                    </p>
                    <span class="right_feng">
                    <span class="fengniao">{{v.delivery_mode.text}}</span>
                    <span class="zhunshida" v-text="v.supports[1].name"></span>
                   </span>
                    <p class="shang_3">
                        <span class="qisong">¥{{v.float_minimum_order_amount}}起送/{{v.piecewise_agent_fee.tips}}</span>
                    </p>
                    <span class="last_time">
                        <span class="gongli">{{v.distance}}/</span><span class="peisongtime">{{v.order_lead_time}}</span>
                    </span>
                </li>
            </ul>
      </div>
      <div id="dibutianchong">

      </div>
      <div id="dibu">
          <ul id="ul2">
              <li id="waimai">
                  <i class="el-icon-eleme"></i>
                  <p>外卖</p>
              </li>
              <li @click="shopsousuo()"> 
                  <i class="el-icon-discover"></i>
                  <p>搜索</p>
              </li>
              <li @click="dingdan()">
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
    name:"Lyf_shouye",
    data() {
        return {
            dizhi:"",
            swiperImgs1:[],
            shop:null,
            shopp:null,
            value: [],
            swiperImgs:[],
            swiperImgs2:[],
            name:"复旦大学",

        }
    },
    created() {
        this.dizhi = this.$route.query;
        this.name = this.dizhi.name;
        console.log(this.dizhi);
        this.shops();
        this.fen();
    },
    methods: {
        shops(){
              const api = "https://elm.cangdu.org/shopping/restaurants?latitude=" + this.dizhi.latitude + "&longitude=" + this.dizhi.longitude;
        this.$http({
            url:api,
            method:"get",
            withCredentials:true,//默认为false
            data:{
           }
        }).then(res=>{
        this.shopp = res.data;
        for (let i = 0; i < res.data.length; i++) {
           this.value[i] = res.data[i].rating;
        }
        console.log(this.shopp);
        //elm.cangdu.org/img/164ad0b6a3917599.jpg
        });
        },
        fen(){
              const api = "https://elm.cangdu.org/v2/index_entry";
        this.$http({
            url:api,
            method:"get",
            withCredentials:true,//默认为false
            data:{
           }
        }).then(res=>{
        this.swiperImgs = res.data;
        for (let i = 0; i < this.swiperImgs.length; i++) {
            if (i < 8) {
                this.swiperImgs1[i] = this.swiperImgs[i]
            }else{
                this.swiperImgs2[i-8] = this.swiperImgs[i]
            }
            
        }
        console.log(this.swiperImgs1);
        console.log(this.swiperImgs2);
        console.log(this.swiperImgs);
        });
        },
        dz_tz(){
        this.$router.push({
        path:"/lyf_dizhi",
        query:{

        }
      });
        },
        shopsousuo(){
        this.$router.push({
        path:"/lyf_shopsousuo",
        query:{
            data:this.dizhi
        }
      }); 
        },
        pai(a){
        this.$router.push({
        path:"/lyf_shoppai",
        query:{
            data:a,
            jingwei:this.dizhi
        }
      }); 
        },
        shopto(a){
        console.log(a)
        this.$router.push({
        path:"/q_store",
        query:{
            data:a,
            jingwei:this.dizhi
        }
      }); 
        },
        dingdan(){
        this.$router.push({
        path:"/lyf_dingdan",
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
div,li {
  background-color: #ffffff;
}
#toubu{
      width: 37.5rem;
      height: 4.57rem;
      background-color: #409EFF;
      text-align: center;
      position: fixed;
      top: 0;
      z-index: 15;
}
.el1{
  color: white;
  font-size:3rem ;
  float: left;
  margin: 1rem;
}
.el2{
    color: white;
    font-size:3rem ;
    float: right;
    margin: 1rem;
}
#dizhi {
    font-size:1.875rem;
    color: #ffffff;
    line-height: 4.57rem;
    font-weight: 700;
}
/* 轮播 */
#lunbo{
    padding-top: 4rem;
    width: 100%;
    height: 20rem;
    overflow: hidden;
}
#lunbo img{
    width: 5rem;
    margin:1rem;
}
#lunbo li{
    box-sizing: border-box;
    width: 9.3rem;
    float: left;
    text-align: center;

}
#lunbo p{
    font-size: 1.29rem;
}
/* 商家信息 */
#fujin{
    color: #999999;
    font-size:1.4rem;
    margin: 1rem;
    margin-bottom: 0;
}
.shangtu {
    width: 6.328rem;
}
.shang{
    position: relative;
    padding: 1rem;
    padding-bottom: 2rem;
    border-bottom: 0.11rem solid #f1f1f1;

}
/* 店铺样式 */
/* p标签 */
.shang p {
    display: inline;
    
}
.xing {
    display: inline;
    

}
.suo {
    display: inline-block;
    transform:scale(0.6,0.6) translateX(-6rem);
    
}
.pin{
    font-size: 1.2rem;
    color: #333;
    background-color: #ffd930;
    display: inline-block;
    font-weight: 900;
    width: 3rem;
    height: 1.5rem;
    text-align: center;
    content: "\54C1\724C";
    padding: 0 .1rem;
    border-radius: 0.1rem;
    line-height: 1.5rem;
    

}
.shang_1{
    position: absolute;
    top: 1rem;

}
.shang_2{
    position: absolute;
    top: 3.5rem;
    
}
.sahng_3{
    position: absolute;
    top: 8rem;
}
.shang_name{
    font: .65rem/.65rem PingFangSC-Regular;
    font-weight: 700;
    color: #333;
    font-size: 1.6rem;
}
.bao{
    position: absolute;
    right: 1.4rem;
}
.bao>span {
    font-size: .5rem;
    color: #999;
    border: .025rem solid #f1f1f1;
    padding: 0 .04rem;
    border-radius: .08rem;
    margin-left: .05rem;
}
.fengniao{
    color: #fff;
    background-color: #3190e8;
    border: .025rem solid #3190e8;
    font-size: .4rem;
    padding: .04rem .08rem 0;
    border-radius: .08rem;
    margin-left: .08rem;
}
.zhunshida {
    color: #3190e8;
    border: .025rem solid #3190e8;
    font-size: .4rem;
    padding: .04rem .08rem 0;
    border-radius: .08rem;
    margin-left: .08rem;
}
.right_feng{
    position: absolute;
    top: 2.5rem;
    right: 1.4rem;
}
.qisong{
    transform: scale(.9);
    font-size: .5rem;
    color: #666;
}
.last_time{
    transform: scale(.9);
    font-size: 1.17rem;
    position: absolute;
    top: 6rem;
    right: 1rem;
}
.gongli{
    color: #999999;
    padding-left: 4rem;
}
/* 底部固定定位 */
#dibu,#dibutianchong{
    width: 37.5rem;
    height: 4.5rem;
}
#dibu{
    position: fixed;
    bottom: 0rem;
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
#dian{
    width: 10rem;
    height: 1rem;
    position: absolute;
    top: 21.5rem;
    left: 15rem;
    z-index: 10;
}
.yuandian1,.yuandian2{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border: 0.06rem solid #e66e66;
    border-radius: 0.28rem;
    background-color: wheat;
    margin: 1rem;
}

</style>