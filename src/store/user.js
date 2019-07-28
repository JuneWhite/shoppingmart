export default{
  namespaced:true,
  state:{
    isLogin:false,
    userData:{}
  },
  mutations:{
    setUserInfo(state,data){
      state.isLogin=true
      state.userData=data
    },
    logout(state){
      state.userData={}
      state.isLogin=false
    },
    updateUserInfo(state,obj){
      for(let i in obj){
        state.userData[i]=obj[i]
      }
    }
  }
}