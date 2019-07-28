<template>
  <div class="page">
    <el-row>
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
            <el-button type="primary" @click="pay">立即支付</el-button>
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
      ids: [],
      ordersn: "",
      total: ""
    };
  },
  // 页面刷新执行
  created() {
    this.ids = this.$route.params.id.split(",");
    let param = this.getOrder(this.ids);
    this.getOrderData(param);
  },
  // 组件切换执行
  activated() {
    this.ids = this.$route.params.id.split(",");
    let param = this.getOrder(this.ids);
    this.getOrderData(param);
  },
  methods: {
    // 立即支付
    pay() {
      if (!this.$store.state.user.userData.id) {
        this.$message({
          message: "请你先登录",
          type: "error"
        });
        this.$router.push("/login");
      } else {
        let params = this.getOrder(this.ids);
        params.accountid = this.$store.state.user.userData.id;
        params.type = "PC";
        params.ordersn = this.ordersn;
        params.totalprice = this.total;
        console.log(params);
        this.axios
          .post("/api/order/create", { params })
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.deleteCart();
              this.$router.push({
                path: "/payment",
                query: { ordersn: res.data.data.ordersn }
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(error => {});
      }
    },
    // 取消支付
    cancle() {
      const h = this.$createElement;
      this.$msgbox({
        title: "取消订单",
        message: h("p", null, [
          h("span", { style: "color: red" }, "您确定要取消订单吗？")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 0);
            }, 0);
          } else {
            done();
          }
        }
      })
        .then(action => {
          this.$message({
            type: "success",
            message: "订单已取消"
          });
          this.$router.push("/member");
        })
        .catch(error => {});
    },
    handleChange(val) {
      // console.log(val);
    },
    // 整理订单信息参数
    getOrder(ids) {
      let param = {};
      let productionid = [];
      let productionnum = [];
      let productioncolor = [];
      let productionsize = [];
      console.log(ids);
      for (let i in ids) {
        let arr = this.$store.state.cart.orderData;
        let obj = arr.find(item => {
          return item.productionid == ids[i];
        });
        if (obj) {
          productionid.push(obj.productionid);
          productionnum.push(obj.productionnum);
          productioncolor.push(obj.productioncolor);
          productionsize.push(obj.productionsize);
        }
      }
      return (param = {
        productionid,
        productionnum,
        productioncolor,
        productionsize
      });
    },
    // ajax获取订单信息
    getOrderData(params) {
      this.axios
        .get("/api/order/getdata", { params })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.orderData = res.data.data;
            this.ordersn = res.data.ordersn;
            this.total = res.data.total.toFixed(2);
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
    // 删除购物车
    deleteCart() {
      let cartids = [];
      let params = this.getOrder(this.ids);
      let cartArr = this.$store.state.cart.cartData;
      cartArr.forEach(item => {
        for (let i=0;i<params.productionid.length;i++) {
          if (
            item.productionid == params.productionid[i] &&
            item.productionnum == params.productionnum[i] &&
            item.productioncolor == params.productioncolor[i] &&
            item.productionsize == params.productionsize[i]
          ) {
            cartids.push(item.id);
          }
        }
      })
      if(cartids&&cartids.length>0){
        this.$store.dispatch("cart/deleteCart", cartids);
      }      
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
  height: 460px;
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
