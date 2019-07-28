export default{
  namespaced:true,
  state:{
    proData:{}
  },
  mutations:{
    setproInfo(state,data){
      state.proData=data
    }
  },
  actions:{
    getProData(store){
      this.axios
        .get("/api/production/getDataByCategoryIds", {
          params: {
            id: ids,
            pagesize: 9,
            currentpage: 1
          }
        })
        .then(res => {
          store.commit('setproInfo',res.data.data.listdata)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}