<template>
  <div id="app">
       <div id="toubu">
        <i @click="hui()" class="el-icon-arrow-left el1"></i>
        <span id="dizhi">
            搜索
        </span>
      </div>
      <div id="count">
          <input  ref="input" type="text" v-model.trim="searchCondition" placeholder="请输入商家或美食名称" id="inp">
          <button @click="search()" id="ti">提交</button>
      </div>
      <transition name="el-fade-in">
         <div v-show="baoqian" id="di">
          <p>很抱歉 ! 无搜索结果</p>
      </div>
      </transition>
     
      <div class="search">
      <div class="history" v-if="historySearch.length">
        <p class="lishi">
          历史搜索
          <i class="el-icon-delete" @click="clearnHistory()"></i>
        </p>
        <section>
          <span @click="sousuolishi(i)" v-for="(i,index) in historySearch" :key="index">{{i}}</span>
        </section>
      </div>
    </div>
    <div id="dibu">
          <ul id="ul2">
              <li @click="shouye()">
                  <i class="el-icon-eleme"></i>
                  <p>外卖</p>
              </li>
              <li id="waimai"> 
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
 name:"Lyf_shopsousuo",
    data() {
        return {
            jw:"",
            baoqian:false,
            timeout:null,
            searchCondition: "", //搜索的关键词
            historySearch: [] //存放历史搜索的关键词


        }
    },
    created() {
        this.jw = this.$route.query;
        console.log(this.jw);
        let searchHistory = localStorage.getItem("searchWord");
    if (searchHistory) {
      this.historySearch = searchHistory.split(",");
      console.log(this.historySearch);
    }
    },
    mounted() {
    //刚进入时获取焦点
    this.$refs["input"].focus();
  },
    methods: {
        hui(){
            this.$router.go(-1)
        },
         //点击提交调用下面函数
    search() {
        if (this.$refs.input.value == "") {
            console.log("1");
            return;
        }
      this.getSearchMessage("input");
       this.baoqian = true
    },
    // 清除浏览记录
    clearnHistory(){
      this.historySearch = [];
      localStorage.removeItem("searchWord");
    },
    //获取搜索的相关数据(调用后端接口处)
    getSearchMessage(event) {
      if (event) {
        //此处是为了解决在移动端唤醒软键盘时，当点击完成按钮后软键盘不收回问题
        this.$refs[event].blur();
      }
      //接口调用成功时把关键词储存起来
      this.setLocalStorage();
      console.log(this.historySearch)
    },
    //储存历史搜索到LocalStorage
    setLocalStorage() {
      let searchWord = localStorage.getItem("searchWord");
      if (searchWord == null) {
        localStorage.setItem("searchWord", this.searchCondition);
      } else {
        let arr = localStorage.getItem("searchWord");
        arr = arr.split(",");
        //去除重复的历史搜索
        if (arr.indexOf(this.searchCondition) != -1) {
          arr = arr;
        } else {
          // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
          arr.unshift(this.searchCondition);
        }
        this.historySearch = arr;
        //设置历史搜索最多显示多少条
        if (this.historySearch.length > 5) {
          // pop() 方法用于删除并返回数组的最后一个元素。
          this.historySearch.pop();
        }
        localStorage.setItem("searchWord", this.historySearch);
      }
        
    },
    sousuolishi(i){
      console.log(i);
      this.$refs.input.value = i;
    },
      shouye(){
        this.$router.push({
        path:"/lyf_shouye",
        query:{
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
    
  }
}
</script>

<style scoped>
#app{
  overflow: hidden;
  /* background-color: #e4e4e4; */
}
div {
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
    #count{
        margin-top: 4.57rem;
        height: 3.51rem;
        padding: 1.17rem;
    }
    #inp{
        width: 25rem;
        height: 3.514rem;
        border: 1px solid #e4e4e4;
        background-color: #f2f2f2;
        border-radius: 1rem;
        font-weight: 700;
        padding-left: 1rem;
    }
    #ti{
        width: 7.7rem;
        height: 3.5rem;
        border: 1px solid #3190e8;
        background-color: #3190e8;
        color: #ffffff;
        outline: none; 
        border-radius: 0.8rem;
    }
    #di{
        margin-top: 0.3rem;
        width: 37.5rem;
        height: 4rem;
        text-align: center;
        line-height: 4rem;
        font-size: 1.52rem;
    }
   /* 搜索框 */
.search {
  width: 37.5rem;
  margin: 0 auto;
  margin-top: 20%;
}
.lishi{
    margin-left: 1rem;
    font-size: 1.4rem;
}

section {
  display: flex;
  margin-top: 10px;
}
span {
  background: #3190e8;
  padding: 10px;
  border-radius: 15px;
  margin-right: 10px;
  color: #fff;
}
i{
    cursor: pointer;
}
i:hover{
    color: red;
}
/* 底部导航 */
#dibu{
    width: 37.5rem;
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
</style>