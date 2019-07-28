<template>
  <div class="container" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- 登录注册导航条 -->
    <el-row class="page loginNav">
      <el-col :span="12">服务热线：400-000-0000</el-col>
      <el-col :span="12" class="login">
        <template v-if="this.$store.state.user.isLogin">
          <router-link to="/member">
						<el-button size="mini" type="primary" plain>会员中心</el-button>				
					</router-link>
          <router-link to="/logout">
						<el-button size="mini">退出</el-button>				
					</router-link>
        </template>
        <template v-else>
          <router-link to="/login">
					<el-button size="mini">登录</el-button>						
					</router-link>
          <router-link to="/register">
					<el-button size="mini">注册</el-button>					
					</router-link>
        </template>
      </el-col>
    </el-row>
    <!-- 搜索栏 -->
    <el-row class="page searchNav">
      <el-col :span="8">
        <img src="@/assets/images/logo.png" class="logo" alt />
        <img src="@/assets/images/header.gif" class="headerImg" alt />
      </el-col>
      <!-- 搜索 -->
      <el-col :span="12" class="searchBox">
        <el-autocomplete
          v-model="keywords"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          style="width:100%; margin-top:20px;"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-autocomplete>
      </el-col>
      <!-- 购物车 -->
      <el-col :span="4">
        <router-link to="/member/cart">
          <el-badge :value="this.$store.getters['cart/cartNum']" class="shoppingCar" id="badge">
            <el-button icon="el-icon-shopping-cart-2" type="primary">购物车</el-button>
          </el-badge>
        </router-link>
      </el-col>
    </el-row>
    <!-- 导航 -->
    <el-row class="page">
      <el-menu :default-active="$route.path" mode="horizontal" router @select="handleSelect">
        <el-menu-item index="/index" route="/index" class="GeneralLedger el-menu-demo">商城首页</el-menu-item>
        <el-menu-item
          v-for="item in navData"
          :key="item.id"
          :index="'/p/'+item.id"
          class="el-menu-demo"
          :route="'/p/'+item.id"
        >{{item.categoryname}}</el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {
      keywords: "",
      navData: [],
      fullscreenLoading:true
    };
  },
  created() {
    this.navData = this.$store.state.nav.navData;
    if(window.location.pathname=='/login'){
      this.fullscreenLoading=false
    }
    if(this.navData.length>0){
      this.fullscreenLoading=false
    }else{
      setTimeout(()=>{
        this.fullscreenLoading=false
        this.$router.go(0)
      },10000)
    }
  },
  methods: {
    handleSelect(key, keyPath) {},
    querySearch(queryString, cb) {
      this.axios
        .get("/api/production/search", {
          params: {
            keywords: queryString
          }
        })
        .then(
          function(response) {
            if (response.data.code == 0) {
              cb(response.data.data);
            } else {
              cb([]);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            cb([]);
          }.bind(this)
        );
    },
    search() {
      if (this.keywords != "") {
        this.$router.push({
          path: "/search",
          query: { keywords: this.keywords }
        });
      }
    }
  }
};
</script>

<style>
.logo{
  width: 200px;
}
.loginNav {
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 20px;
}
.login {
  text-align: right;
}
.headerImg {
  height:100px;
  margin-left: 30px;
}
.shoppingCar {
  float: right;
  /* margin-right: 50px; */
}
.searchNav {
  display: flex;
  align-items: center;
}
.searchBox {
  display: flex;
}
.el-menu-demo {
  height: 40px !important;
  line-height: 40px !important;
}
.GeneralLedger {
  width: 190px;
  text-align: center;
  background-color: #d02629 !important;
  color: white !important;
}
/* .el-menu--horizontal>.el-menu-item.is-active{
	background-color: #D02629!important;
	color: white!important;
} */
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #d02629;
    color: #303133;
}
</style>