<template>
  <div class="page">
    <!-- 来个小球，实现动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="'/p/'+item.to"
        v-for="(item,i) in breadcrumbData"
        :key="i"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="18">
        <el-row>
          <el-col :span="9" class="goodsImg">
            <!-- <img :src="goodData.productionphoto" alt /> -->
            <pic-zoom :url="goodData.productionphoto?goodData.productionphoto:''" :scale="3"></pic-zoom>
          </el-col>
          <el-col :span="15" class="goodsDetail">
            <!-- title -->
            <h3>{{goodData.productiontitle}}</h3>
            <!-- price -->
            <div class="price">
              <span>商城价：</span>
              <span class="redPrice">{{goodData.productionprice}}</span>
            </div>
            <div class="time">
              <span>上架时间：</span>
              <span class="timeInfo">{{goodData.addtime|timeformate('yyyy/MM/dd hh:mm:ss') }}</span>
            </div>
            <!-- property -->
            <div class="property">
              <div class="color">
                <span>颜色：</span>
                <span>
                  <el-radio-group v-model="productioncolor" @change="handleColorChange">
                    <el-radio
                      :label="item"
                      size="small"
                      border
                      v-for="(item,i) in goodColor"
                      :key="i"
                    ></el-radio>
                  </el-radio-group>
                </span>
              </div>
              <div class="size">
                <span>尺码：</span>
                <span>
                  <el-radio-group v-model="productionsize" @change="handleSizeChange">
                    <el-radio
                      :label="item"
                      size="small"
                      border
                      v-for="(item,i) in goodSize"
                      :key="i"
                    ></el-radio>
                  </el-radio-group>
                </span>
              </div>
            </div>
            <div class="shopcar">
              <span>数量：</span>
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="10"
                label="描述文字"
                style="width:120px"
              ></el-input-number>
            </div>
            <!-- 加入购物车 -->
            <div class="shopcar">
              <el-button type="primary" icon="el-icon-shopping-cart-2" @click="handleCart">加入购物车</el-button>
              <el-button type="danger" @click="handleShop">立即购买</el-button>
            </div>
            <!-- 服务承诺 -->
            <div class="promise">
              <span>服务承诺：</span>
              <span class="content">
                <img src="@/assets/images/7day_60.gif" alt />
                7天退货
              </span>
              <span class="content">
                <img src="@/assets/images/pz_60.gif" alt />
                品质承诺
              </span>
              <span class="content">
                <img src="@/assets/images/psbf_60.gif" alt />
                破损补寄
              </span>
              <span class="content">
                <img src="@/assets/images/jswl_60.gif" alt />
                急速物流
              </span>
            </div>
          </el-col>
        </el-row>
        <!-- 产品参数展示 -->
        <el-row class="productionParams">
          <template>
            <el-tabs type="card" v-model="activeName">
              <el-tab-pane label="商品参数" name="first">
                <span class="param" v-for="(item,i) in this.goodsParams" :key="i">
                  <el-tag type="danger">{{item}}</el-tag>
                </span>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-row>
        <!-- 产品详情描述 -->
        <el-row>    
            <div class="productiondesc" v-html="goodData.productiondesc"></div>
        </el-row>
      </el-col>
      <!-- 热卖产品 -->
      <el-col :span="6" class="hotGoods">
        <h3 class="hot">
          <img src="@/assets/images/fire.png" alt />Hot热卖
        </h3>
        <el-row v-for="item in hotData" class="hot-pro-list" :key="item.id">
          <router-link :to="'/d/'+item.id">
          <el-col :span="8">
            <div class="hot-list-img  proInfo">
              <img :src="item.productionphoto" />
            </div>
          </el-col>
          <el-col :span="16">
            <span class="prot-list-title">{{item.productiontitle}}</span>
            <br />
            <span class="prot-list-price">{{item.productionprice}}</span>
          </el-col>
          </router-link>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getDetailBreadcrumbData } from "@/function";
import filters from "@/filters";
import PicZoom from "vue-piczoom";
export default {
  components: { PicZoom },
  name: "Detail",
  data() {
    return {
      radio1: "",
      radio2: "",
      num: 1,
      id: 0,
      goodData: {},
      goodColor: [],
      goodSize: [],
      goodsParams: [],
      breadcrumbData: [],
      activeName: "first",
      productionsize: "",
      productioncolor: "",
      productionnum: 1,
      hotData: [],
      ballFlag: false //小球是否显示
    };
  },
  created() {
    this.dataInit(parseInt(this.$route.params.id));
  },
  activated() {
    this.dataInit(parseInt(this.$route.params.id));
  },
  beforeRouteUpdate(to, from, next) {
    this.dataInit(parseInt(to.params.id));
    next();
  },
  filters,
  methods: {
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()
      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge") //badge: 底部购物车数量的位置
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`; //最终要移到的坐标位置
      el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)"; //要实现的动画效果
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getHotData() {
      this.axios
        .get("/api/production/getHotData", {
          params: { pagesize: 8 }
        })
        .then(
          function(response) {
            let data = response.data.data;
            if (response.data.code == 0) {
              this.hotData = data;
              // console.log(this.hotData)
            } else {
              this.$message(response.data.msg);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$message("服务器繁忙，请稍后重试");
          }.bind(this)
        );
    },
    dataInit(id) {
      this.getHotData();
      this.id = id;
      this.axios
        .get("/api/production/getRow", {
          params: { id: this.id }
        })
        .then(res => {
          this.goodData = res.data.data;
          console.log(this.goodData);
          // 获取面包屑数据
          this.breadcrumbData = getDetailBreadcrumbData(
            this.goodData.categoryid,
            this.$store.state.nav.navData
          );
          // 获取产品数据
          if (res.data.data.productionsize.includes("/")) {
            this.goodSize = res.data.data.productionsize.split("/");
          } else {
            this.goodSize = res.data.data.productionsize.split("-");
          }
          if (res.data.data.productioncolor.includes("/")) {
            this.goodColor = res.data.data.productioncolor.split("/");
          } else {
            this.goodColor = res.data.data.productioncolor.split("-");
          }
          this.goodsParams = res.data.data.productionparam.split(";");
          this.goodsParams.pop();
        })
        .catch(error => {
          console.log(error);
        });
      this.productionnum = 1;
      this.productioncolor = "";
      this.productionsize = "";
    },
    handleChange(val) {
      this.productionnum = val;
    },
    handleSizeChange(val) {
      this.productionsize = val;
    },
    handleColorChange(val) {
      this.productioncolor = val;
    },
    setVuex(cationsName) {
      return new Promise((resolve, reject) => {
        if (!this.productionsize) {
          console.log("宝贝尺码不能为空");
          this.$message({
            message: "宝贝尺码不能为空",
            type: "warning"
          });
          reject("宝贝尺码不能为空");
        } else if (!this.productioncolor) {
          console.log("宝贝颜色不能为空");
          this.$message({
            message: "宝贝颜色不能为空",
            type: "warning"
          });
          reject("宝贝颜色不能为空");
        } else if (
          this.productionnum &&
          this.productionsize &&
          this.productioncolor
        ) {
          console.log(this.$store.state.user.userData.id);
          this.$store.dispatch(cationsName, {
            accountid: this.$store.state.user.userData.id,
            productionid: this.id,
            productionnum: this.productionnum,
            productioncolor: this.productioncolor,
            productionsize: this.productionsize
          });
          resolve("成功了");
        }
      });
    },
    handleCart() {
      // 判断用户是否已经登录
      if (
        this.$store.state.user.userData &&
        this.$store.state.user.userData.id
      ) {        
        this.setVuex("cart/addCart")
          .then(() => {
            this.ballFlag = true;
          })
          .catch(error => {});
      } else {
        this.$message({
          message: "请您先登录",
          type: "warning"
        });
        this.$router.push("/login");
      }
    },
    handleShop() {
      this.$store.commit("cart/resetOrder");
      this.setVuex("cart/addOrder")
        .then(() => {
          this.$router.push("/order/" + this.id);
        })
        .catch(error => {});
    }
  }
};
</script>
<style scoped>
.ball {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 520px;
  left: 443px;
}
.goodsImg {
  height: 400px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
}
.goodsDetail {
  padding: 0 20px;
}
.price {
  height: 60px;
  background-color: #eee;
  line-height: 60px;
  font-size: 16px;
  padding-left: 30px;
  display: flex;
  align-items: center;
}
.price .redPrice {
  font-size: 30px;
  font-weight: bold;
  color: red;
}
.size {
  margin-top: 10px;
}
.color {
  margin-top: 10px;
}
.shopcar {
  padding-top: 10px;
}
.promise {
  margin-top: 10px;
  display: flex;
}
.promise .content {
  font-size: 16px;
  color: #cccccc;
  line-height: 30px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.promise .content img {
  width: 20px;
}
.breadcrumb {
  /* margin: 10px 0; */
  padding: 20px 0;
  background-color:#FEF0F0;
  padding-left: 10px;
  margin-top: 5px;
  margin-bottom: -10px;

}
.productionParams {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #666666;
}
.productionParams .param {
  margin-right: 20px;
}
.el-radio {
  margin: 0;
}
.el-radio.is-bordered {
  margin-left: 0;
}
.productiondesc {
  text-align: center;
  overflow: hidden;
}
.time {
  margin-top: 10px;
}
.timeInfo {
  font-size: 16px;
}
.goodsImg {
  position: relative;
}
.hot-pro-list {
  width: 100%;
  height: 60px;
  overflow: hidden;
  margin-top: 10px;
}
.hot-pro-list img {
  width: 100%;
}
.hot-pro-list .hot-list-img {
  width: 100%;
  height: 60px;
  overflow: hidden;
}
.prot-list-title {
  font-size: 14px;
  line-height: 30px;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.prot-list-price {
  font-size: 18px;
  color: red;
  line-height: 30px;
}
.hot {
  color: red;
}
.hot img {
  height: 30px;
}
.hotGoods{
  padding-bottom: 20px;
}
.proInfo:hover{
	animation: pulse 1s;
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }  
}
</style>
