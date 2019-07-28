<template>
  <div class="page">
    <el-row  v-loading.fullscreen.lock="fullscreenLoading">
      <!-- 订单详情 -->
      <el-col :span="12" class="detail">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            :title="(index+1)+' '+item.productiontitle+'  ￥：'+item.itemtotal+'.00元'"
            :name="index"
            v-for="(item,index) in  orderData"
            :key="item.productionid"
          >
            <div class="orderInfo">
              <img :src="item.productionphoto" alt />
              <div>
                <span>
                  <span>颜色：</span>
                  {{item.productioncolor}}
                </span>
                <span>
                  <span>尺码：</span>
                  {{item.productionsize}}
                </span>
                <span>
                  <span>数量：</span>
                  {{item.productionnum}}
                </span>
                <br />
                <span>
                  <span>价格：</span>
                  {{item.productionprice}}元
                </span>
                <br />
                <span>
                  <span>小计：</span>
                  {{item.itemtotal}}.00元
                </span>
                <br />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <!-- 订单支付 -->
      <el-col :span="12" class="order">
        <el-card class="box-card">
          <div class="text item">收款方：中山有限责任公司</div>
          <div class="text item">支付总金额：{{total}}元</div>
          <div class="text item">订单号：{{ordersn}}</div>
          <div class="text item">
            <el-button type="primary" @click="keeppay">立即支付</el-button>
            <el-button type="danger" @click="cancle">取消订单</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      activeNames: ["0"],
      orderData: [],
      ordersn: "",
      total: "",
      fullscreenLoading:true,
      password:'',
      paytimes:0
    };
  },
  created() {
    this.ordersn = this.$route.query.ordersn
    this.getOrderData(this.ordersn)
  },
  // activated() {
  //   this.ordersn = this.$route.query.ordersn
  //   this.getOrderData(this.ordersn)
  // },
  beforeRouteUpdate(to,from,next){
    this.ordersn = to.query.ordersn
    this.getOrderData(to.query.ordersn)
    next()
  },
  methods: {
    keeppay() {
      // 重新输入密码，继续支付
      this.openPassWord()
    },
    cancle() {
      // 回到个人中心——我的订单
      this.$router.push('/member/orders')
    },
    handleChange(val) {},
    // 获取订单数据
    getOrderData(ordersn) {
      this.axios
        .get("/api/order/getrow", { params:{ordersn}})
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.orderData = res.data.data;
            this.total = res.data.total.toFixed(2);
            this.openPassWord()
          } else {
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
    },
    // 支付
    payment(password){
      this.axios.post('/api/payment/pay',{
          params:{
            ordersn:this.ordersn,
            accountid:this.$store.state.user.userData.id,
            password:password
          }
        })
        .then(res=>{          
          console.log(res)
          if(res.data.code==0){
            // 支付成功
            this.fullscreenLoading=false
            this.$router.push({
              path:'/success',
              query:{
                ordersn:this.ordersn
              }
            })
          }else if(res.data.code==5){
            // 支付密码不正确
            this.paytimes++
            if(this.paytimes>2){
              this.$message({
                message:'支付密码错误超过三次',
                type:'error'
              })
              this.$router.push('/member')
            }else{
              // 重新输入密码
              this.openPassWord()
            }
          }else if(res.data.code==6){
            // 余额不足
            this.fullscreenLoading=false
            this.$message({
                message:res.data.msg,
                type:'error'
              })            
            this.$router.push('/member/recharge')
          }else{
            this.$message({
            message: "服务器忙，请稍后重试",
            type: "error"
          });
          }
        })
        .catch(error=>{
          this.$message({
            message: "服务器忙，请稍后重试",
            type: "error"
          });
        })
    },
    // 打开密码弹窗
    openPassWord() {
      let noticeMessage='请输入支付密码'
      let leasttines=3-this.paytimes
      if(this.paytimes>0){
        noticeMessage='请重新输入支付密码('+leasttines+'次机会)'
      }
        this.$prompt(noticeMessage, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType:'password',
          inputPattern: /.{6,20}$/,
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
          // 记录支付密码、提交ajax请求
          this.payment(value)
        }).catch((error) => {
          // 取消，关闭loading弹窗
          this.fullscreenLoading=false
        });
      }
  }
};
</script>
<style scoped>
.detail {

}
.orderInfo {
  display: flex;
}
.orderInfo img {
  height: 70px;
  margin-right: 10px;
}
.order {

}
.text {
  font-size: 18px;
}
.item {
  padding: 18px 0;
}
.box-card {
  width: 100%;
  margin: 0 auto;
}
</style>
