import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
Vue.use(createPersistedState);

import moduleUser from '@/store/user'
import moduleCart from '@/store/cart'
import moduleNav from '@/store/nav'
import moduleProduction from '@/store/production'

export default new Vuex.Store({
	plugins: [
		createPersistedState({
			storage: window.sessionStorage
		})
	],
	state:{
		token:'',
		scrollBottom:0
	},
	mutations:{
		setToken(state,data){
			state.token=data
		},
		setScroll(state){
			state.scrollBottom++
		}
	},
	getters:{
	
	},
	modules:{
		user:moduleUser,
		cart:moduleCart,
		nav:moduleNav,
		production:moduleProduction
	}
})