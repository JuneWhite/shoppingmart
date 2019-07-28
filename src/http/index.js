import axios from 'axios'
import store from '@/store'
import router from '@/router'

//设置请求时长
axios.defaults.timeout = 10000;

//拦截请求
axios.interceptors.request.use(
	config => {
		config.headers = {
			'token': store.state.token
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

//拦截response
axios.interceptors.response.use(
	response => {
		if (response.data.code == 401) {
			router.push({
				path: "/login"
			})
			return;
		}
		if (response.data.code == 400) {
			//续订token
			axios.get('/api/common/token').then(response => {
				if (response.data.code == 0) {
					store.commit('setToken', response.data.data.token);
					axios.interceptors.request;
				}
			})
			return;
		}
		return response;
	},
	error => {
		return Promise.reject(error)
	}
)

export default axios;
