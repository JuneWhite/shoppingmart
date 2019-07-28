<template>
  <div class="container bgcolor-dark padding-bottom-20">
    <el-row class="pages page">
      <el-col :span="18">
        <el-row>
          <el-col :span="4">
            <ul>
              <li>
                <router-link to="/help">新手上路</router-link>
              </li>
              <li>
                <router-link to="/help">如何注册成为会员</router-link>
              </li>
              <li>
                <router-link to="/help">积分细则</router-link>
              </li>
              <li>
                <router-link to="/help">积分兑换说明</router-link>
              </li>
              <li>
                <router-link to="/help">如何搜索</router-link>
              </li>
              <li>
                <router-link to="/help">忘记密码</router-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <ul>
              <li>
                <router-link to="/help">支付方式</router-link>
              </li>
              <li>
                <router-link to="/help">分期付款</router-link>
              </li>
              <li>
                <router-link to="/help">邮局汇款</router-link>
              </li>
              <li>
                <router-link to="/help">公司转账</router-link>
              </li>
              <li>
                <router-link to="/help">如何注册支付宝</router-link>
              </li>
              <li>
                <router-link to="/help">在线支付</router-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <ul>
              <li>
                <router-link to="/help">售后服务</router-link>
              </li>
              <li>
                <router-link to="/help">联系卖家</router-link>
              </li>
              <li>
                <router-link to="/help">退换货政策</router-link>
              </li>
              <li>
                <router-link to="/help">退换货流程</router-link>
              </li>
              <li>
                <router-link to="/help">返修/退换货</router-link>
              </li>
              <li>
                <router-link to="/help">退款申请</router-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <ul>
              <li>
                <router-link to="/help">购物指南</router-link>
              </li>
              <li>
                <router-link to="/help">会员修改密码</router-link>
              </li>
              <li>
                <router-link to="/help">会员修改个人资料</router-link>
              </li>
              <li>
                <router-link to="/help">商品发布</router-link>
              </li>
              <li>
                <router-link to="/help">修改收货地址</router-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <ul>
              <li>
                <router-link to="/help">联系我们</router-link>
              </li>
              <li>
                <router-link to="/help">400-000-0000</router-link>
              </li>
              <li>
                <router-link to="/help">08:00-22:30(周一至周日)</router-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <ul>
              <li>
                <router-link to="/help">在线客服</router-link>
              </li>
              <li>
                <router-link to="/help">E-mail：web@shopwt.com</router-link>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="text-align-center">
        <img src="../../assets/images/qrcode.png" class="qrcode" />
      </el-col>
    </el-row>
    <el-row class="pages text-align-center padding-top-20">
      Copyright 2018 ShopWT All rights reserved.
      版权所有：www.shopwt.com
    </el-row>
  </div>
</template>
<script>
export default {
  name: "pagesFooter",
  data() {
    return {};
  }
};
</script>
<style scoped>
.pages {
	line-height: 22px;
	/* background-color: #333; */
	/* height: 200px; */
	position:relative;
	bottom: 0;
}
.pages ul {
  padding-top: 20px;
}
.pages ul li{
  font-size: 16px;
  line-height: 30px;
}
.qrcode {
  margin-top: 20px;
}
.pages ul li a:link,
.pages ul li a:visited {
  color: #fff;
}
.text-align-center{
	text-align: center;
}
padding-top-20{
	color: #fff;
}
</style>
