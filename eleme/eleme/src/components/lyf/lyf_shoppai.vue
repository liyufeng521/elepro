<template>
	<div id="app">
		<div id="toubu">
			<i @click="hui()" class="el-icon-arrow-left el1"></i>
			<span id="dizhi">
				{{pai.title}}
			</span>
		</div>
		<div id="daohang">
			<ul id="fl">
                
                <li @click="fenl()">
                    分类<i class="el-icon-caret-bottom"></i>
                    </li>
                <li @click="paixu()" id="zhong">
                    排序<i class="el-icon-caret-bottom"></i>
                    </li>
                <li @click="shaixuan()">
                    筛选<i class="el-icon-caret-bottom"></i>
                    </li>
            </ul>
            
            <ul id="yincang">
                <li @click="clickyi(v)" class="lis1" :key="i" v-for="(v,i) in cai"  v-show="xiaoshi==1">
                    <img class="imgs1"  :src="'https://fuss10.elemecdn.com/' + v.image_url + ('.png' || '.jpeg')">
                     <el-dropdown-item class="clearfix">
                                    {{v.name}}
                        <el-badge :max="99" class="mark" :value="v.count" type="primary"/>
                         </el-dropdown-item>
                    </li>
            </ul>
            <div v-show="left2" v-bind:style = "styleobj" class="liaoli">
                <p @click="shopget(v.id)" class="ps1" v-show="v.name" :key="i" v-for="(v,i) in left1"><span>{{v.name}} </span>
                    <span>{{v.count}}</span>
                    </p>
            </div>
            <div  v-show="paixu1" id="paixu">
                <p @click="getpaixu(4)" class="zhinegn"><span><i class="el-icon-sort el"></i></span>智能排序</p>
                <p @click="getpaixu(5)" class="zhinegn"><span><i class="el-icon-location-outline el"></i></span>距离最近</p>
                <p @click="getpaixu(6)" class="zhinegn"><span><i class="el-icon-position el"></i></span>销量最高</p>
                <p @click="getpaixu(1)" class="zhinegn"><span><i class="el-icon-coin el"></i></span>起送价最低</p>
                <p @click="getpaixu(2)" class="zhinegn"><span><i class="el-icon-time el"></i></span>配送速度最快</p>
                <p @click="getpaixu(3)" class="zhinegn"><span><i class="el-icon-eleme el"></i></span>评分最高</p>
            </div>
            <div v-show="shai" id="shaixuan">
                <p id="pei1">配送方式</p>
               
                <span @click="fengsong('#feng')" id="feng">
                    <i v-show="fengdui1" class="el-icon-check"></i>
                    <i v-show="fengdui" class="el-icon-bicycle"></i>
                    蜂鸟专送</span>
                <p id="shangjia">商家属性(可多选)</p>
                <div id="shuai">
                   <ul>
                       <li class="liqingkong" @click="duoxuan('#lis1',0)" id="lis1">
                           <!-- 8 -->
                           <span v-show="sps[0]" id="pin">品</span>
                           <i v-show="sp[0]" class="el-icon-check"></i>
                    品牌商家
                       </li>
                       <li class="liqingkong" @click="duoxuan('#lis2',1)" id="lis2">
                           <!-- 7 -->
                            <span v-show="sps[1]" id="bao">
                                
                        保
                    </span>
                    <i v-show="sp[1]" class="el-icon-check"></i>
                    外卖宝
                       </li>
                       <li class="liqingkong" @click="duoxuan('#lis3',2)" id="lis3">
                           <!-- 9 -->
                           <span  v-show="sps[2]" id="zhun">准</span>
                           <i v-show="sp[2]" class="el-icon-check"></i>
                    准时达
                       </li>
                       <!-- 5 -->
                       <li class="liqingkong" @click="duoxuan('#lis4',3)" id="lis4">
                           <span  v-show="sps[3]" id="xin">新</span>
                           <i v-show="sp[3]" class="el-icon-check"></i>
                    新店
                       </li>
                       <!-- 3 -->
                       <li class="liqingkong" @click="duoxuan('#lis5',4)" id="lis5">
                           <span  v-show="sps[4]" id="fu">付</span>
                           <i v-show="sp[4]" class="el-icon-check"></i>
                    在线支付
                       </li>
                       <li class="liqingkong" @click="duoxuan('#lis6',5)" id="lis6">
                           <!-- 4 -->
                           <span  v-show="sps[5]" id="piao">票</span>
                           <i v-show="sp[5]" class="el-icon-check"></i>
                    开发票
                       </li>
                   </ul>
                </div>
                <div id="queren">
                    <div @click="qingkong()" id="qingkong">
                        清空
                    </div>
                    <div @click="querennima()" id="queding">
                        {{que}}
                    </div>
                </div>
            </div>
		</div>
        <!-- 商铺列表 -->
        <div id="shopli">
            <ul>
                <li @click="shopto(v.id)" :key="i" v-for="(v,i) in shoplibiao" class="shang">
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
                    score-template=""></el-rate><span class="pingfen">{{pinfenxing[i]}}</span>
                    <span class="yueshou">月售{{v.recent_order_num}}单</span>
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

	</div>
</template>

<script>
import $ from 'jquery'
	export default {
        name:"Lyf_shoppai",
		data() {
			return {
				pai: null,
				cai: null,
                yiguo:[],
                xiaoshi:0,
                left1:null,
                shoplibiao:[],
                pinfenxing:[],
                quenum:0,
                que:"确定",
                quejia:0,
                fengdui:true,
                fengdui1:false,
                sps:[
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true
                ],
                sp:[
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ],
                panduan:[
                    8,7,9,5,3,4
                ],
                jing:null,
                supports:[],
                title:null,
                left2:false,
                paixu1:false,
                shai:false,
                shuxing:"",
                 styleobj :{
                    whi:'red'
                 },



			}
		},
		created() {
            this.pai = this.$route.query.data;
            // console.log(this.pai)
            this.fenlei()
            this.jing = this.$route.query.jingwei;
            // console.log(this.jing)
            this.shopget(0)
		},
		methods: {
			fenlei() {
				const api = "https://elm.cangdu.org/shopping/v2/restaurant/category";
				// console.log(api);
				this.$http({
					url: api,
					method: "get",
					withCredentials: true, //默认为false
					data: {

					}
				}).then(res => {
					console.log(res);
                    this.cai = res.data;
                    this.cai[0].image_url = "4/82/43703799592368585b23589cf3ba8png";
                    this.cai[4].image_url = "ac15c5dd59b641bdfdeb822362547fb4png";
                    this.cai[7].image_url = "435a7eda7659bac613e524ca7c1ae12epng";
                   
				});
            },
           
           shopget(v) {
               this.xiaoshi = 0;
               this.left2 = false;
                this.paixu1 = false;
                this.shai = false;
                const api = "http://elm.cangdu.org/shopping/restaurants?latitude=31.297182&longitude=121.503202&offset=0&limit=20&extras[=activities&restaurant_category_ids[]="+v;
				console.log(api);
				this.$http({
					url: api,
					method: "get",
					withCredentials: true, //默认为false
					data: {

					}
				}).then(res => {
					console.log(res);
                    this.shoplibiao = res.data;
                    for (let i = 0; i < this.shoplibiao.length; i++) {
                        this.pinfenxing[i] = Number(this.shoplibiao[i].rating).toFixed(1);
                    }
                   
				});
            },
           fenl(){
               if ( this.xiaoshi == 1) {
                    this.xiaoshi = 0;
                    this.left2 = false;
                this.paixu1 = false;
                this.shai = false;
               }else{
                    this.xiaoshi = 1;
                    this.left2 = true;
                    this.paixu1 = false;
                    this.shai = false;
               }
            },
            clickyi(a){
                this.type = "primary";
                this.left1 = a.sub_categories;
                

            },
            paixu(){
                if (this.paixu1) {
                    this.xiaoshi = 0;
                    this.paixu1 = false;
                    this.left2 = false;
                    this.shai = false;
                } else {
                    this.xiaoshi = 0;
                    this.paixu1 = true;
                    this.left2 = false;
                    this.shai = false;
                }
                

            },
            shaixuan(){
                if (this.shai) {
                    this.xiaoshi = 0;
                    this.shai = false;
                    this.paixu1 = false;
                    this.left2 = false;
                } else {
                    this.xiaoshi = 0;
                    this.shai = true;
                    this.paixu1 = false;
                    this.left2 = false;
                }
            },
            getpaixu(a){
                this.xiaoshi = 0;
               this.left2 = false;
                this.paixu1 = false;
                this.shai = false;
                const api = "http://elm.cangdu.org/shopping/restaurants?latitude=34.825897&longitude=113.67894&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=225&order_by=" + a + "&delivery_mode[]=null";
                
				console.log(api);
				this.$http({
					url: api,
					method: "get",
					withCredentials: true, //默认为false
					data: {

					}
				}).then(res => {
                    this.shoplibiao = res.data;
				});
            },
             hui(){
            this.$router.go(-1)
                },
            // 筛选
            fengsong(a){
                if (this.fengdui) {
                    $(a).css("color","#409EFF");
                    $(a).css("border","1px solid #409EFF");
                    this.fengdui = false;
                    this.fengdui1 = true;
                    this.sps[6] = false;
                }else{
                     $(a).css("color","#333333");
                      $(a).css("border","1px solid #eee");
                     this.fengdui = true;
                     this.fengdui1 = false;
                     this.sps[6] = true;
                }
                for (let i = 0; i < this.sps.length; i++) {
                    if (this.sps[i] == false) {
                        this.quejia++;
                        
                    }
                    
                }
                this.que = "确认(" + this.quejia + ")"
                if (this.quejia == 0) {
                    this.que = "确认"
                }
                
            },
            qingkong(){
                for (let i = 0; i < this.sps.length; i++) {
                    this.sps[i] = true;
                    this.sp[i] = false;
                }
                    this.fengdui = true;
                    this.fengdui1 = false;
                    $(".liqingkong").css("border","1px solid #eee");
                    $(".liqingkong").css("color","#333333");
                    $("#feng").css("color","#333333");
                      $("#feng").css("border","1px solid #eee");
                      this.que = "确认"
            },
            duoxuan(a,b){
                b = b * 1;//对号没加上
                this.quejia = 0;
                if (this.sps[b]) {
                    $(a).css("color","#409EFF");
                    $(a).css("border","1px solid #409EFF");
                    this.sps[b] = false;
                    this.sp[b] = true;
                }else{
                     $(a).css("color","#333333");
                      $(a).css("border","1px solid #eee");
                     this.sps[b] = true;
                     this.sp[b] = false;
                     
                }
                for (let i = 0; i < this.sps.length; i++) {
                    if (this.sps[i] == false) {
                        this.quejia++;
                        
                    }
                    
                }
                this.que = "确认(" + this.quejia + ")"
                if (this.quejia == 0) {
                    this.que = "确认"
                }
                
            },
            querennima(){
                this.xiaoshi = 0;
                this.left2 = false;
                this.paixu1 = false;
                this.shai = false;
                if (this.fengdui1 == true) {
                    this.shuxing = this.shuxing + "delivery_mode[]=1"
                }
                for (let i = 0; i < this.sp.length - 1; i++) {
                    if (this.sp[i] == true) {
                        this.shuxing = this.shuxing + "&support_ids[]=" + this.panduan[i]
                    }
                    
                }
                console.log(this.shuxing);
                const api = "http://elm.cangdu.org/shopping/restaurants?latitude=34.825897&longitude=113.67894&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=null&delivery_mode[]=null&" + this.shuxing;
                this.shuxing = "";
				console.log(api);
				this.$http({
					url: api,
					method: "get",
					withCredentials: true, //默认为false
					data: {

					}
				}).then(res => {
                    this.shoplibiao = res.data;
				});
            },
            shopto(a){
                console.log(a)
                this.$router.push({
                path:"/qqq",
                query:{
                 data:a
        }
      }); 
        },
		}
	}
</script>

<style scoped>
	#app {
		overflow: hidden;
		background-color: #e4e4e4;
	}

	div,ul {
		background-color: #ffffff;
	}

	#toubu {
		width: 37.5rem;
		height: 4.57rem;
		background-color: #409EFF;
		text-align: center;
	}

	.el1 {
		color: white;
		font-size: 3rem;
		float: left;
		margin: 1rem;
	}

	#dizhi {
		font-size: 1.875rem;
		color: #ffffff;
		line-height: 4.57rem;
		font-weight: 700;
	}

	/* 导航栏 */
    #fl{
        width: 100%;
        height: 4rem;
        margin: 0 auto;
        display: flex;
        border-bottom: .025rem solid #f1f1f1;
    }
    #fl li {
        width: 33%;
        height: 70%;
        margin: 0.5rem auto;
        text-align: center;
        padding: 0;
        list-style: none;
        font-style: normal;
        text-decoration: none;
        border: none;
        color: #333;
        font-weight: 400;
        font-family: Microsoft Yahei;
        box-sizing: border-box;
        line-height: 3rem;
    }
    #fl #zhong{
        border-right: .025rem solid #e4e4e4;
        border-left: .025rem solid #e4e4e4;
    }
    /* 分类图片 */
    .imgs1{
        width: 2rem;
        margin-left: 2rem;
    }
   
    .lis1{
            width: 19rem;
          
    }
    .clearfix{
        width: 10rem;
        padding-left: 2rem;
        display: inline-block;
   }
   #yincang,#paixu,#shaixuan{
       /* float: left; */
        position: absolute;
        top: 8.97rem;
        z-index: 10;
   }
   .mark{
       float: right;
   }
   .liaoli{
       width: 19rem;
       height: 32.4rem;
       /* float: right; */
        overflow-x: hidden;
        overflow-y: scroll;
        line-height: 30px;
        text-align: center;
        position: absolute;
        top: 8.97rem;
        right: -0.5rem;
        z-index: 10;
   }
   .ps1{
    display: flex;
    justify-content: space-between;
    height: 3.6rem;
    line-height: 3.6rem;
    padding-right: .5rem;
    border-bottom: .025rem solid #e4e4e4;
    color: #666;
    font-size: 1.3rem;
   }

   /* 商铺 */
  .shang{
      
    position: relative;
    padding: 1rem;
    padding-bottom: 2rem;
    border-bottom: 0.11rem solid #f1f1f1;

}
.shangtu {
    width: 6.328rem;
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
    margin-left: 7rem;

}
.shang_name{
    font: .65rem/.65rem PingFangSC-Regular;
    font-weight: 700;
    color: #333;
    font-size: 1.6rem;
}
.suo {
    display: inline-block;
    transform:scale(0.6,0.6) translateX(7rem);
    
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
.right_feng{
    position: absolute;
    top: 2.5rem;
    right: 1.4rem;
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
.qisong{
    position: absolute;
    top: 5.8rem;
    left:7.4rem;
    transform: scale(.9);
    font-size: .5rem;
    color: #666;
}
.el-icon-check{
    color: #3190e8;
}
#shuai{
    width: 37.5rem;
    display: flex;
}
#pin,#bao,#zhun,#xin,#fu,#piao{
    /* border: 1px solid red; */
    width: .8rem;
    height: .8rem;
    font-size: .5rem;
    border: 1px solid #e4e4e4;
    border-radius: .15rem;
    margin-right: .25rem;
    line-height: .8rem;
    text-align: center;
}
#shuai li,#feng{
    width: 8rem;
    height: 2.2rem;
    display: inline-block;
    font-size: 1.1rem;
    color: #333;
    margin-right: .25rem;
    border-radius: .125rem;
    padding: 0 .25rem;
    margin: 0.35rem;
    border: 1px solid #eee;
    padding-left: 3rem;
    padding-top: 1.5rem;
}
#pei1,#shangjia{
    font-size: 1rem;
    color: #333;
    line-height: 1.5rem;
    height: 1.5rem;
    text-align: left;
    padding-left: .5rem;
    background-color: #fff;
    margin: 1rem;
}
#pin{
    color: rgb(63, 189, 230);
    border-color: rgb(63, 189, 230);
}
#bao{
    color: rgb(153, 153, 153);
    border-color: rgb(153, 153, 153);
}
#zhun{
    color: rgb(87, 169, 255);
    border-color: rgb(87, 169, 255);
}
#xin{
    color: rgb(232, 132, 45);
    border-color: rgb(232, 132, 45);
}
#fu{
        color: rgb(255, 78, 0);
    border-color: rgb(255, 78, 0);
}
#piao{
    color: rgb(153, 153, 153);
    border-color: rgb(153, 153, 153);
}
#paixu{
    width: 37.5rem;
}
span>i{
    font-size: 1.4rem;
    color: #3190e8;
}
.pingfen{
    position: absolute;
    top: 0.4rem;
    left: 12rem;
    color: #ff6000;
}
.yueshou{
    position: absolute;
    top: 0.4rem;
    left: 15rem;
    width: 8rem;
    color: #666;
}
.zhinegn{
    width: 30rem;
    height: 5.8rem;
    display: flex;
    align-items: center;
    line-height: 5.8rem;
    flex: auto;
    margin-left: 3.65rem;
    text-align: left;
    text-indent: .25rem;
    border-bottom: .025rem solid #e4e4e4;
    padding-left: 1rem;
    align-items: center;
    font-size: 1.3rem;
    position: relative;
    color: #666666;
}
.el {
    font-size: 1.9rem;
    position: absolute;
    left: -2.2rem;
    top: 1.8rem;
}
#queren{
    width: 37.5rem;
    height: 6rem;
    background-color: #f1f1f1;
}
#qingkong,#queding{
    width: 16rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    border: 1px solid #fff;
    float: left;
    margin: 1rem;
    color: #333333;
    font-weight: 600;
    font-family: Microsoft Yahei;
}
#toubu,#daohang{
    position: fixed;
    z-index: 10;

}
#daohang{
    width: 37.5rem;
    top: 4rem;
}
#queding{
    float: right;
    color: #ffffff;
    background-color: #56d176;
    border: .025rem solid #56d176;
}
#shopli{
    margin-top: 8.1rem;
}
.liaoli,#yincang,#paixu,#shaixuan{
    top: 4.1rem;
}
</style>
