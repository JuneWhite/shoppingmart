import axios from "axios";
import {Message} from 'element-ui'

export default{
  namespaced:true,
  state:{
    cartData:[],
    orderData:[]
  },
  getters:{
    cartNum(state){
      return state.cartData.length
    },
    getCartData(state){
      return state.cartData
    },
    cartTotal(state){
      let total=0
      state.cartData.forEach(item=>{
        total+=item['productionnum']*item['productionprice']
      })
      return total
    }
  },
  mutations:{
    logout(state){
      state.cartData=[]
    },
    setCartInfo(state,data){
      state.cartData.push(data)
    },
    addCart(state,data){
      let flag=true
      state.cartData.forEach(item=>{
        if(item.id==data.id){
          item.productionnum=data.productionnum
          flag=false
        }
      })
      if(flag){
        state.cartData.push(data)
      }    
    },
    deleteCart(state,ids){
      if(Array.isArray(ids)&&ids.length==0){
        state.cartData=[]
      }else if(Array.isArray(ids)&&ids.length==1){
        let arr=state.cartData
        state.cartData=arr.filter(item=>{
          return item.id!=ids[0]
        })
      }else if(Array.isArray(ids)&&ids.length>1){
        let arr=state.cartData
        for(let i in ids){
          arr=arr.filter(item=>{
            return item.id!=ids[i]
          })
        }
        state.cartData=arr
      }
    },
    addOrder(state,data){
      state.orderData.push(data)
    },
    resetOrder(state){
      state.orderData=[]
    }
  },
  actions:{
    addOrder({commit},data){
      commit('addOrder',data)
    },
    addCart({commit},data){
      console.log(data)
      axios.post('/api/cart/addCart',{
        params:data
      }).then(res=>{
        if(res.data.code==0){
          Message({
            message:'产品添加成功',
            type:'success'
          })
          commit('addCart',res.data.data)
        }else{
          Message({
            message:res.data.msg,
            type:'error'
          })
        }
      }).catch(error=>{
        Message({
          message:'服务器忙，请稍后重试',
          type:'error'
        })
      }) 
    },
    deleteCart(context,ids){
      axios.delete('/api/cart/delete',{
        params:{
          id:ids,
          accountid:context.rootState.user.userData.id
        }
      })
        .then(res=>{
          if(res.data.code==0){
            Message({
              message:'删除成功',
              type:'success'
            })
            context.commit('deleteCart',ids)
          }else{
            Message({
              message:res.data.msg,
              type:'error'
            })
          }
        })
        .catch(error=>{
          console.log(error)
          Message({
            message:'服务器忙，请稍后重试',
            type:'error'
          })
        })
    }
  }
}