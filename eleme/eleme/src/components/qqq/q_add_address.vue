<template>
  <div id="whole">
    <div id="top">
      <i class="el-icon-arrow-left icon1" @click="goback()"></i>
      <span class="confirm">添加地址</span>
    </div>
    <div id="content">
      <p class="p1">联系人  <input v-model="message[0]" type="text" placeholder="你的名字"></p>
      <p class="p2"> <el-radio v-model="radio" label="先生">先生</el-radio>
       <el-radio v-model="radio" label="女士">女士</el-radio></p>
       <p class="p3">联系电话 <input v-model="message[1]" type="text" placeholder="你的手机号"> <i class="el-icon-plus add"></i></p>
        <p class="p4">送餐地址 <input v-model="message[2]" type="text" placeholder="小区/写字楼/学校" @click="search()"></p>
        <p class="p5" ><input v-model="message[3]" type="text" placeholder="详细地址（如门牌号等）" ></p> 
         <p class="p6">标签 <input v-model="message[4]" type="text" placeholder="无/家/学校/公司"></p>
    </div>
     <el-button type="primary" class="btn" @click="trues()">确定</el-button>
  </div>
</template>

<script>
export default {
name:"q_add_address",
data() {
    return {
         radio: '男',
         message:[,,,,]
    }
},
created() {
    this.ads=this.$route.query.xinxi;
    this.message[2] = this.ads.name ;
    console.log(this.ads);
},
methods: {
    goback(){
             this.$router.push({
                 name: "q_pay_chooseAds",
                 });
        },
    trues(){
      console.log(this.message)
      console.log(this.radio)
          if ($("input").val().length==0) {
                    alert("信息不能为空!");    
					return;
			}else{
                 this.$router.push({
                 name: "q_pay_chooseAds",
                //  query:{
                //      usermeg:this.message,
                //      xingbie:this.radio,
                //  }
                 });
            }
    },
    search(){
         this.$router.push({
         name: "q_address_search",
         });
         
    }
},
}
</script>

<style scoped>
#top {
  width: 37.5rem;
  height: 4.5rem;
  background-color: #409eff;
}
.icon1 {
  font-size: 2.5rem;
  color: white;
  line-height: 4.5rem;
  padding-left: 1rem;
}
.confirm {
  font-size: 2rem;
  color: white;
  margin-left: 11rem;
  line-height: 4.5rem;
}
#content{
    width: 37.5rem;
   padding-bottom: 3rem;
    background-color: white;
}
.p1{
    line-height: 5rem;
    padding-left:3rem; 
    padding-top: 1rem;
}
.p1>input{
    width: 20rem;
    margin-left: 3rem;
    border-bottom:0.1rem solid #E4E7ED; 
    padding: 1rem;
}
.p2{
    line-height: 5rem;
    padding-left:11rem; 
    
}
.p3{
    line-height: 5rem;
    padding-left:3rem; 
    border-top:0.1rem solid #E4E7ED; 
}
.p3>input{
    width: 20rem;
    margin-left: 1rem;
     padding: 1rem;
     border-bottom:0.1rem solid #E4E7ED; 
}
.add{
    color: #409eff;
    font-size: 2rem;
}
.p4{
    line-height: 5rem;
    padding-left:3rem; 
   
}
.p4>input{
    width: 20rem;
    margin-left: 1rem;
     padding: 1rem;
      border-bottom:0.1rem solid #E4E7ED; 
}
.p5{
    line-height: 5rem;
    padding-left:3rem; 
   
}
.p5>input{
    width: 20rem;
    margin-left: 7.5rem;
     padding: 1rem;
    border-bottom:0.1rem solid #E4E7ED; 
}
.p6{
    line-height: 5rem;
    padding-left:3rem; 
   
}
.p6>input{
    width: 20rem;
    margin-left: 4rem;
     padding: 1rem;
     border-bottom:0.1rem solid #E4E7ED; 
}
.btn{
    width: 33.5rem;
    margin-left: 2rem;
    margin-top: 2rem;
}
</style>