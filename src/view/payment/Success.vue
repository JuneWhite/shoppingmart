<template>
  <div class="page success">
    <img src="@/assets/images/success.png" alt="">
    <h1>恭喜您，支付成功！</h1>
    <p><span>订单号：</span>{{orderData.ordersn}}</p>
    <p><span>订单金额：</span>{{orderData.totalprice}}</p>
  </div>
</template>
<script>
export default {
  name:'Sucess',
  data(){
    return {
      ordersn:'',
      orderData:{}
    }
  },
  created() {
    this.ordersn = this.$route.query.ordersn
    this.getOrderData(this.ordersn)
  },
  activated() {
    this.ordersn = this.$route.query.ordersn
    this.getOrderData(this.ordersn)
  },
  beforeRouteUpdate(to,from,next){
    this.ordersn =to.query.ordersn
    this.getOrderData(to.query.ordersn)
    next()
  },
  methods:{
    getOrderData(ordersn) {
      this.axios
        .get("/api/order/getrow", { params:{ordersn}})
        .then(res => {
          console.log(res)
          if (res.data.code == 0) {

          } else if(res.data.code == 2){
            this.orderData=res.data.orderdata
          }else {
            this.$message({
              message: "服务器忙，请稍后重试",
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "服务器忙，请稍后重试",
            type: "error"
          });
        });
    }
  }
}
</script>
<style scoped>
.success{
  text-align: center;
  padding:10px;
}
.success img{
  width: 140px;
}
</style>
