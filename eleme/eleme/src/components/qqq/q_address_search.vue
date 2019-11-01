<template>
  <div id="app">
      <div id="toubu">
        <i @click="hui()" class="el-icon-arrow-left el1"></i>
        <span id="dizhi">
            {{dizhi.name}}
        </span>
        <span id="el2" @click="qie()">切换城市</span>
      </div>
      <!-- 输入框部分 -->
      <div id="sousuo">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
             placeholder="请输入内容"
               @select="handleSelect"
               @change="jian()"
                clearable
                class="neirong"
></el-autocomplete>
        <el-button class="ti" @click="tijiao()" type="primary">提交</el-button>
      </div>
      <div id="last">
        <ul>
          <li :key="i" v-for="(v,i) in lis" class="jieguo" @click="tiao(v)">
            <p class="p1">{{v.name}}</p>
            <p class="p2">{{v.address}}</p>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    name:'q_address_search',
    data() {
        return {
            dizhi:32,
            restaurants: [],
            state: '',
            timeout:  null,
            lis:null,
            data:{}
        }
    },
    created() {
        this.data=this.$route.query.data;
        console.log(this.data);
    },
    methods: {
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      tijiao(){
        const api = "https://elm.cangdu.org/v1/pois?city_id=" + this.dizhi + "&keyword=" + this.state + "&type=search";
        console.log(api);
        this.$http({
            url:api,
            method:"get",
            withCredentials:true,//默认为false
            data:{
              
           }
        }).then(res=>{
          console.log(res);
          this.lis = res.data;

        });
      },
       hui(){
            this.$router.push({
              name:'q_add_address',
              query:{
                data:this.data,
              }
            })
        },
      qie(){
      this.$router.push({
        path:"/lyf_dizhi",
        query:{

        }
      });
      
      },
      tiao(a){
        this.$router.push({
        path:"/q_add_address",
        query:{
            xinxi:a,
            data:this.data
        }
      });
      }
    },
     mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>

<style scoped>
#app{
  overflow: hidden;
  background-color: #e4e4e4;
}
div {
  background-color: #ffffff;
}
#toubu{
      width: 37.5rem;
      height: 4.57rem;
      background-color: #409EFF;
      text-align: center;
}
.el1{
  color: white;
  font-size:3rem ;
  float: left;
  margin: 1rem;
}
#el2{
    color: white;
    font-size:1.2rem ;
    float: right;
    margin: 2rem;
}
#dizhi {
    font-size:1.875rem;
    color: #ffffff;
    line-height: 4.57rem;
    font-weight: 700;
    margin-left: -3rem;
}
/* 输入框样式 */
#sousuo{
  text-align: center;
  width: 100%;
  height: 10rem;
  /* margin-top: 2rem; */
}
.neirong{
  width: 33.7rem;

}
.ti{
  background-color: #3190e8;
   width: 33.7rem;
   margin-top: 1.5rem;
}
#last{
  width: 100%;
}
.jieguo{
  width: 35.5rem;
  height: 5.09rem;
  padding: 1rem
}
.p1{
  font-size:1.5rem;
  color: #333333;
  margin-left: 2rem;

}
.p2{
font-size:1rem;
  color: #999999;
  padding-top: 1rem;
  margin-left: 2rem;
}
</style>