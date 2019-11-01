<template>
  <div id="whole">
    <div id="top">
      <i class="el-icon-arrow-left icon1" @click="goback()"></i>
      <span class="confirm">选择地址</span>
    </div>
    <div id="user">
      <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" class="icon3"></el-switch>
      <div class="center">
        <p class="usermsg1">
          <span class="username">所发生的</span>
          <span class="sex">辅导费</span>
          <span class="tel">范德萨发生</span>
        </p>
        <p class="usermsg2">
          <span class="label">哈哈哈</span>
          <span class="address">方大化工发顺丰</span>
        </p>
      </div>
    </div>

    <div id="bottom" @click="add()">
      <i class="el-icon-circle-plus-outline bot1"></i>
      <span class="bot2">新增收货地址</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "q_pay_chooseAds",
  created() {
    this.usermsg = this.$route.query.usermeg;
    console.log(this.usermsg);
    this.sex=this.$route.query.xingbie;
    console.log(this.sex);
},
  methods: {
    data() {
      return {
        value: true
      };
    },
    goback() {
      this.$router.push({
                 name: "q_store_pay",
                 });
    },
    add() {
      this.$router.push({
        name: "q_add_address"
      });
    }
  }
};
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
#user {
  width: 37.5rem;
  height: 8rem;
  background-color: white;
}
.icon3 {
  color: #409eff;
  font-size: 2rem;
  float: left;
  margin-left: 3rem;
  margin-top: 3rem;
}
.center {
  float: left;
  margin-left: 2rem;
  margin-top: 1rem;
}
.center > p {
  line-height: 3rem;
}
.icon4 {
  float: left;
  margin-top: 3rem;
  margin-left: 8rem;
  font-size: 2rem;
}
.username {
  font-size: 1.8rem;
}
.sex,
.tel,
.address {
  color: #606266;
  font-size: 1.4rem;
}
.label {
  color: white;
  font-size: 1.2rem;
  background-color: rgb(44, 238, 93);
  border-radius: 10%;
  padding: 0.1rem;
}
.bot1 {
  color: #409eff;
  font-size: 2.5rem;
  position: absolute;
  bottom: 2.5rem;
  left: 13rem;
}
.bot2 {
  color: #409eff;
  font-size: 1.8rem;
  position: absolute;
  bottom: 3rem;
  left: 16rem;
}
</style>