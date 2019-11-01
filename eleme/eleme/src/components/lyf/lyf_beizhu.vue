<template>
  <div id="app">
      <div id="toubu">
        <i @click="hui()" class="el-icon-arrow-left el1"></i>
        <span id="dizhi">
            订单备注
        </span>
      </div>
      <div id="kuai">
          <p>快速备注</p>
          <div>
    <el-radio-group v-model="radio1">
      <el-radio-button label="不要辣"></el-radio-button>
      <el-radio-button label="少点辣"></el-radio-button>
      <el-radio-button label="多点辣"></el-radio-button>
    </el-radio-group>
  </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"lLf_beizhu",
    data() {
        return {
             radio1: '不要辣',
        }
    },
    created() {
        
    },
    methods: {
        
    },
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
</style>