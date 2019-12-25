import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectCity: '北京',
    headerTitle: '',
    backPage: false
  },
  mutations: {
    selectCity(state, obj){
			state.selectCity = obj
		},
		changeTitle(state, title){
			state.headerTitle = title
		},
		isBackPage(state, status){
			state.backPage = status
		}
  },
  actions: {
  },
  modules: {
  }
})
