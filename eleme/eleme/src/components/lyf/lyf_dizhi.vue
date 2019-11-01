<template>
  <div id="app">
      <div id="toubu">
        <i class="el-icon-eleme el1"></i>
        <i class="el-icon-user el2"></i>
      </div>
      <div id="first">
        <span>当前定位城市:</span>
        <a href="###">定位不准时,请在城市列表中选择</a>
      </div>
       <div id="two">
        <span @click="get(di)" id="ding" v-text="dingwei"></span>
        
      </div>
       <div id="three">
        <p>热门城市</p>
        <ul id="ul1">
          <li @click="get(v)" class="lis" :v-if="show == 3" :key="i" v-for="(v,i) in hot" v-text="v.name"></li>
        </ul>
      </div>
      <div id="last">
        <div :key="i" v-for="(v,i) in az">
          <br>
          <p>{{v}}<span v-if="i == 0">(按字母排序)</span></p>
          <ul>
            <li @click="get(g)" :key="h" v-for="(g,h) in obj[v]">{{g.name}}</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"Lyf_dizhi",
    data() {
        return {
            dingwei:"",
            hot:[],
            show:1,
            az:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","I","S","T","U","V","W","X","Y","Z"],
            Obj:{},
            di:{},
            suo:{},


        }
    },created() {
        this.getDizhi();
        this.getHot();
        this.getSou();
    },methods: {
         //请求地址信息
      getDizhi(){
        const api = "https://elm.cangdu.org/v1/cities?type=guess";
        this.$http({
            url:api,
            method:"get",
            withCredentials:true,//默认为false
            data:{

           }
        }).then(res=>{
          console.log(res);
          this.dingwei = res.data.name;
          this.di = res.data
          this.show++;

        });
      },
      getHot(){
        const api = "https://elm.cangdu.org/v1/cities?type=hot";
        this.$http({
            url:api,
            method:"get",
            withCredentials:true,//默认为false
            data:{

           }
        }).then(res=>{
          console.log(res);
          this.hot = res.data;
          this.show++;
        });
      },getSou(){
        const api = "https://elm.cangdu.org/v1/cities?type=group";
        this.$http({
            url:api,
            method:"get",
            withCredentials:true,//默认为false
            data:{

           }
        }).then(res=>{
          console.log(res);
          this.obj = res.data;
          this.show++;

        });
      },
      get(b){
      this.$router.push({
        path:"/lyf_sousuo",
        query:{
          data:b,
        }
      });
      },

    },

}
</script>

<style scoped>
div{
  background-color: #fff;
}
#app{
  overflow: hidden;
}
#toubu{
      width: 37.5rem;
      height: 4.57rem;
      background-color: #409EFF;
      position: fixed;
      top: 0;
      z-index: 10;
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
#first{
    width: 37.5rem;
    height: 4.57rem;
    font-size: 1.4rem ;
    position: relative;
    border-bottom: 1px solid  #e4e4e4 ;
    margin-top: 5rem;
}
#first>span{
  font-size: 1.3rem ;
  position: absolute;
  top: 1.5rem;
  left: 1rem;
}
a{
  position: absolute;
  top: 1.4rem;
  right: 1rem;
  font-weight: 400;
}
#two{
  width: 37.5rem;
  height: 4.57rem;
  color: #3190e8;
  line-height: 4.57rem;
  border-top: 1px solid  #e4e4e4 ;
  border-bottom: 2px solid  #e4e4e4 ;
}
li{
  width:9.38rem;
  height:4.1rem;
  line-height:4.1rem;
  overflow: hidden;
  text-align:center;
  float:left;
}
p{
  width: 37.5rem;
  height: 4.57rem;
  line-height: 4.56rem;
  overflow: hidden;
}
p{
  color: #666666;
}
p>span{
  font-size:1rem;
  font-weight: 100;
  color: #999999;
}
</style>