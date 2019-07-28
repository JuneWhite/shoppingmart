<template>
  <div class="center page">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row :gutter="5" v-if="listData.length > 0" class="box">
      <el-col :span="6" v-for="item in listData" :key="item.id">
        <router-link class="proInfo" :to="'/d/'+item.id" tag="div">
          <div class="proCover">
            <img :src="item.productionphoto" />
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
    </el-row>
  </div>
</template>
<script>
import filters from "@/filters";
export default {
  name: "lists",
  data() {
    return {
      keywords: "",
      listData: [],
      totalRows: 0,
      currentPage: 1,
      pageSize: 16
    };
  },
  filters,
  created() {
    this.keywords = this.$route.query.keywords;
    this.pageInit();
  },
  activated(){
    this.keywords = this.$route.query.keywords;
    this.pageInit();
  },
  beforeRouteUpdate(to, from, next) {
    this.keywords = to.query.keywords;
    this.pageInit();
    next();
  },
  methods: {
    pageInit() {
      this.axios
        .get("/api/production/getSearchData", {
          params: {
            keywords: this.keywords,
            currentpage: this.currentpage,
            pagesize: 16
          }
        })
        .then(
          function(response) {
            if (response.data.code == 0) {
              this.listData = response.data.data.listdata;
              this.totalRows = parseInt(response.data.data.totalrows);
              this.currentPage = parseInt(response.data.data.currentpage);
              this.pageSize = parseInt(response.data.data.pagesize);
            } else {
              this.$message(response.data.msg, "error");
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$message("服务器繁忙，请稍后重试");
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  padding: 10px 0;
  background-color:#FEF0F0;
  padding-left: 10px;
  margin-top: 5px;
  margin-bottom: -10px;
}
.filters {
  margin: 10px auto;
}
.pro-list {
  padding: 20px;
}
.ordersrule {
  backgroud: #f60 !important;
  margin-bottom: 20px;
}
.box{
  height: 400px;
}
</style>
