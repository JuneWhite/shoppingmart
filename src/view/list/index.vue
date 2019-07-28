<template>
  <div>
    <el-row class="page">
      <!-- 面包屑 -->
      <div class="breadcrumbBox">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="'/p/'+item.to"
            v-for="(item,i) in breadcrumbData"
            :key="i"
          >{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="18">
          <!-- 按钮组 -->
          <div>
            <el-button-group class="buttonGroup">
              <template v-for="(item,i) in listNavData">
                <el-button
                  size="small"
                  v-if="i>0 && item.show"
                  :key="item.id"
                  @click="handleSelect(item.neworder)"
                  :class="item.flag?'buttonActive':''"
                >{{item.categoryname}}</el-button>
              </template>
            </el-button-group>
          </div>
          <!-- 下拉选框 -->
          <!-- <div class="select">
            分页大小：
            <el-select v-model="value" placeholder="16" @change="handleChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                size="mini"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>-->
          <!-- 分页 -->
          <!-- <div class="pagesss">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :page-size="pageSize"
              :total="totalRows"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>-->
          <!-- 产品列表 -->
          <el-row style="min-height:570px">
            <el-row>
              <!-- v-infinite-scroll="load" infinite-scroll-disabled="disabled" style="height:500px;overflow-x:auto" -->
              <el-col :span="6" v-for="item in goodsData" :key="item.id">
                <router-link class="proInfo" :to="'/d/'+item.id" tag="div">
                  <div class="proCover">
                    <el-image :src="item.productionphoto" lazy>
                      <div slot="placeholder" class="image-slot">
                        <img src="@/assets/images/loading.gif" />
                      </div>
                    </el-image>
                  </div>
                  <div class="productionInfoBox">
                    <div class="proTitle">
                      <span>{{item.productiontitle}}</span>
                    </div>
                    <div class="proPrice">
                      <span>{{item.productionprice}}</span>
                    </div>
                  </div>
                </router-link>
              </el-col>
              <!-- <p v-if="loading">加载中...</p>
              <p v-if="noMore">没有更多了</p>-->
            </el-row>
          </el-row>
        </el-col>
        <el-col :span="6">
          <h3 class="hot">
            <img src="@/assets/images/fire.png" alt />Hot热卖
          </h3>
          <el-row :gutter="5" v-for="item in hotData" class="hot-pro-list" :key="item.id">
            <router-link :to="'/d/'+item.id">
              <el-col :span="8">
                <div class="hot-list-img proInfo">
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
    </el-row>
  </div>
</template>
<script>
import {
  getIds,
  getGoodsData,
  getChildrens,
  getbreadcrumbData,
  btnFlag
} from "@/function";
export default {
  name: "List",
  data() {
    return {
      activeIndex: "1",
      listNavData: [],
      goodsData: [],
      breadcrumbData: [],
      totalRows: 0,
      currentPage: 1,
      pageSize: 16,
      totalPages: 0,
      hotData: [],
      options: [
        {
          value: "4",
          label: "4"
        },
        {
          value: "8",
          label: "8"
        },
        {
          value: "12",
          label: "12"
        },
        {
          value: "16",
          label: "16"
        },
        {
          value: "20",
          label: "20"
        }
      ],
      value: "",
      loading: false
    };
  },
  computed: {
    noMore() {
      return this.currentPage >= parseInt(this.totalPages);
    },
    disabled() {
      return this.loading || this.noMore;
    },
    getScroll() {
      return this.$store.state.scrollBottom;
    }
  },
  created() {
    this.getInit(this.$route.params.id, this.$route.query.sid);
  },
  activated() {
    this.getInit(this.$route.params.id, this.$route.query.sid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getInit(to.params.id, to.query.sid);
    next();
  },
  watch: {
    getScroll(newval, oldVal) {
      if (newval) {
        this.currentPage += 1;
        console.log(this.currentPage);
        if (this.currentPage <= parseInt(this.totalPages)) {
          let ids = getIds(
            this.$route.params.id,
            this.$store.state.nav.navData
          );
          getGoodsData(ids, this.pageSize, this.currentPage)
            .then(res => {
              this.loading = false;
              console.log(res.data.data);
              this.pageSize = parseInt(res.data.data.pagesize);
              // this.currentPage = parseInt(res.data.data.currentpage);
              this.totalRows = res.data.data.totalrows;
              this.goodsData = this.goodsData.concat(res.data.data.listdata);
              console.log(this.goodsData);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  },
  methods: {
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
    // handleChange(val) {
    //   let ids = getIds(this.$route.params.id, this.$store.state.nav.navData);
    //   getGoodsData(ids, val, 1)
    //     .then(res => {
    //       console.log(res.data.data);
    //       this.pageSize = parseInt(res.data.data.pagesize);
    //       // this.currentPage = parseInt(res.data.data.currentpage);
    //       this.totalRows = res.data.data.totalrows;
    //       this.goodsData.push(res.data.data.listdata);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // handleCurrentChange(val) {
    //   let ids = getIds(this.$route.params.id, this.$store.state.nav.navData);
    //   getGoodsData(ids, this.pageSize, val)
    //     .then(res => {
    //       console.log(res.data.data);
    //       this.pageSize = parseInt(res.data.data.pagesize);
    //       this.currentPage = parseInt(res.data.data.currentpage);
    //       this.totalRows = res.data.data.totalrows;
    //       this.goodsData.push(res.data.data.listdata);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // 初始化数据
    goodsDataInit(id) {
      this.getHotData();
      let ids = getIds(id, this.$store.state.nav.navData);
      // console.log(ids)
      getGoodsData(ids, this.pageSize, this.currentPage)
        .then(res => {
          this.pageSize = parseInt(res.data.data.pagesize);
          // this.currentPage = parseInt(res.data.data.currentpage);
          this.totalRows = parseInt(res.data.data.totalrows);
          this.totalPages = parseInt(res.data.data.totalpages);
          this.goodsData = res.data.data.listdata;
          console.log(this.goodsData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 初始化
    getInit(id, sid) {
      this.currentPage = 1;
      // 获取按钮组数据
      this.listNavData = getChildrens(id, this.$store.state.nav.navData);
      // 给按钮组添加激活选项
      this.listNavData.forEach(item => {
        if (item.id == sid) {
          item.flag = true;
        } else {
          item.flag = false;
        }
      });
      // 获取面包屑数据
      this.breadcrumbData = getbreadcrumbData(
        id,
        sid,
        this.$store.state.nav.navData
      );
      // 获取产品数据
      if (sid != undefined) {
        let sidArr = [];
        sidArr = sid.split("-");
        let searchId = sidArr[sidArr.length - 1];
        this.goodsDataInit(searchId);
      } else {
        this.goodsDataInit(id);
      }
      btnFlag(sid, this.listNavData);
    },
    // 按钮组选中触发
    handleSelect(id) {
      let start = this.$route.path.lastIndexOf("/");
      let currentId = this.$route.path.substr(start + 1);
      console.log(currentId);
      id = id.replace("0-" + currentId + "-", "");
      this.$router.push(this.$route.path + "?sid=" + id);
    }
  }
};
</script>
<style scoped>
.el-image {
  height: 100%;
}
.el-image img,
.el-image__inner {
  width: 100% !important;
}
.breadcrumb {
  /* margin: 10px 0; */
  padding: 20px 0;
  background-color: #fef0f0;
  padding-left: 10px;
  margin: 5px 0;
}
.buttonGroup {
  margin-bottom: 5px;
}
.buttonActive {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.select {
  /* float: left; */
  display: inline-block;
  font-size: 14px;
}
.select >>> .el-input {
  width: 60px;
}
.pagesss {
  display: inline-block;
}
.select >>> .el-input__inner {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding: 10px;
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
.hotGoods {
  padding-bottom: 10px;
}
.proInfo:hover {
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
