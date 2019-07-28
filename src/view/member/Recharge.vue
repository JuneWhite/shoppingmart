<template>
  <div class="container">
    <el-row class="recharge-box">
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="balance" readonly>
          <template slot="prepend">充值金额</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="recharge-box">
      <el-col :span="12">
        <el-radio-group v-model="balance">
          <el-radio-button label="100"></el-radio-button>
          <el-radio-button label="200"></el-radio-button>
          <el-radio-button label="500"></el-radio-button>
          <el-radio-button label="1000"></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="recharge-box">
      <el-col :span="24">
        <el-radio-group v-model="paymethod">
          <el-radio label="wxpay" border>微信支付</el-radio>
          <el-radio label="alipay" border>支付宝</el-radio>
          <el-radio label="unionpay" border>银联支付</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="recharge-box">
      <el-button type="primary" style="width:100px;" @click="pay">支付</el-button>
    </el-row>
    <el-dialog :title="payname" :visible.sync="dialogTableVisible" width="500px">
      <el-row>
        <el-col :span="12" class="pay-info">
          <i class="el-icon-s-shop"></i> 收款方: 中山公司
          <br />
          <i class="el-icon-s-goods"></i>
          支付总金额: {{balance}}
          <br />
          <i class="el-icon-s-ticket"></i>
          付款方: {{this.$store.state.user.userData.username}}
        </el-col>
        <el-col :span="12">
          <img :src="payurl" style="width:100%;" />
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Recharge",
  data() {
    return {
      dialogTableVisible: false,
      payurl: require("@/assets/images/weixinpay.jpg"),
      balance: 100,
      paymethod: "wxpay",
      payname: "微信支付"
    };
  },
  methods: {
    pay() {
      if (this.paymethod == "wxpay") {
        this.payname = "微信支付";
        this.payurl = require("@/assets/images/weixinpay.jpg");
      } else {
        this.payname = "支付宝支付";
        this.payurl = require("@/assets/images/alipay.jpg");
      }
      this.dialogTableVisible = true;
    }
  }
};
</script>

<style scoped="scoped">
.container {
  margin-top: 10px;
}
.el-page-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  padding-left: 20px;
}
.recharge-box {
  margin: 10px;
  margin-left: 30px;
}
.pay-info {
  margin-top: 10px;
  line-height: 50px;
  font-size: 18px;
}
</style>
