export default{
  namespaced:true,
  state:{
    navData:[]
  },
  mutations:{
    setNavData(state,data){
			state.navData=data
		}
  }
}