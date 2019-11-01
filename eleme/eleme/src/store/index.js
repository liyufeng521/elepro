import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import state from './state'
import mutations from './mutations'
import {act} from './actions'
import getters from './getters'


//配置vuex store存储器用来存储组件之间共享的资源
const store = new Vuex.Store({
   state,
    // 修改状态的方法(共享方法)类似组件中的methods
    // mutations只能做同步操作 不能异步执行
    mutations,
    // actions类似于mutation 不同在于actions提交的是mutations 而不是直接变更状态 actions可以包含任何异步操作
    actions:act,
    // 类似于组件中的computed，依赖于state创建共享属性 该方法对state的数据做处理的
    getters,
  })
// 导出存储对象store给外界使用
  export default store;