<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <div>
          <el-card shadow="never">
            <h3 class="wallet">我的钱包</h3>
            <p>
              账户余额:
              <span class="redwords">{{this.$store.state.user.userData.balance}}.00</span>元
            </p>
            <p>消费金额:{{this.money}}.00 元</p>
            <el-button type="danger" @click="recharge">充值</el-button>
            <el-button type="primary" plain @click="consume">消费记录</el-button>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-card shadow="never">
            <el-progress type="circle" :percentage="finish"></el-progress>

            <div class="userInfo">
              <p>个人信息完成度{{finish}}%</p>
              <el-button type="primary" plain @click="adduserimg">完善信息</el-button>
            </div>
          </el-card>
        </div>
        <div>
          <el-card shadow="never">
            <el-progress type="circle" :percentage="order"></el-progress>

            <div class="userInfo">
              <p>订单已支付比例{{order}}%</p>
              <el-button type="primary" plain @click="orderInfo">订单详情</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      finish: 0,
      money: 0,
      order: 0
    };
  },
  created() {
    this.getFinish();
    this.getMoney();
    this.getOrder();
  },
  methods: {
    getBlabce(){
      
    },
    getFinish() {
      let data = this.$store.state.user.userData;
      let total = Object.keys(data).length;
      let num = 0;
      Object.keys(data).forEach(key => {
        if (data[key]) {
          num++;
        }
      });
      this.finish = parseInt((num / total) * 100);
    },
    getMoney() {
      this.axios
        .get("/api/payment/getData", {
          params: {
            accountid: this.$store.state.user.userData.id,
            pagesize: 10000,
            currentpage: 1
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            let num = 0;
            res.data.data.listdata.forEach(item => {
              num += item.totalprice - 0;
            });
            this.money = num;
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "服务器忙，请稍后重试！"
          });
        });
    },
    getOrder() {
      let no = 0;
      let yes = 0;
      this.axios
        .get("/api/order/getPageData", {
          params: {
            accountid: this.$store.state.user.userData.id,
            pagesize: 10000,
            currentpage: 1
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.listdata.forEach(item => {
              if (item.paymentstatus == 0) {
                no++;
              } else {
                yes++;
              }
            });
            this.order = parseInt((yes / (no + yes)) * 100);
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "服务器忙，请稍后重试！"
          });
        });
    },
    repass() {
      this.$router.push("/member/repass");
    },
    recharge() {
      this.$router.push("/member/recharge");
    },
    adduserimg() {
      this.$router.push("/member/addmsg");
    },
    orderInfo() {
      this.$router.push("/member/orders");
    },
    consume() {
      this.$router.push("/member/money");
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
}
.userInfo {
  display: inline-block;
  margin-top: 0;
  margin-left: 30px;
  position: absolute;
}
.wallet {
  margin: 0%;
  text-align: center;
}
.redwords {
  color: red;
  font-weight: bold;
}
</style>
