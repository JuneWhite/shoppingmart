<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="充值记录" name="recharge">
        <el-table :data="rechargeData.listData" style="width: 100%">          
          <el-table-column label="充值时间" prop="addtime">
            <template slot-scope="props">
              <span>{{props.row.addtime|timeformate('yyyy/MM/dd hh:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="充值金额" prop="money"></el-table-column>
          <el-table-column label="充值方式" prop="type">
            <template slot-scope="props">
              <span v-if='props.row.type==1'>手动充值</span>
              <span v-else>在线充值</span>
            </template>
          </el-table-column>    
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="rechargeData.pageSize"
          :total="rechargeData.totalRows"
          :current-page="rechargeData.currentPage"
          @current-change="rechargeHandleCurrentChange"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="消费记录" name="payment">
        <el-table :data="paymentData.listData" style="width: 100%">
          <el-table-column label="订单编号" prop="ordersn"></el-table-column>
          <el-table-column label="消费金额" prop="totalprice"></el-table-column>
          <el-table-column label="消费时间" prop="addtime">
            <template slot-scope="props">
              <span>{{props.row.addtime|timeformate('yyyy/MM/dd hh:mm:ss') }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="paymentData.pageSize"
          :total="paymentData.totalRows"
          :current-page="paymentData.currentPage"
          @current-change="paymentHandleCurrentChange"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import filters from "@/filters";
export default {
  name: "Money",
  filters,
  data() {
    return {
      activeName: "payment",
      pageSize: 8,
      currentPage: 1,
      rechargeData: {
        listData: [],
        totalRows: 0,
        currentPage: 1,
        pageSize: 8
      },
      paymentData: {
        listData: [],
        totalRows: 0,
        currentPage: 1,
        pageSize: 8
      }
    };
  },
  created() {
    this.getData(this.activeName);
  },
  beforeRouteUpdate(to, from, next) {
    this.getData(this.activeName);
    next();
  },
  methods: {
    paymentHandleCurrentChange(val) {
      this.currentPage = this.paymentData.currentPage = val;
      this.getData(this.activeName);
    },
    rechargeHandleCurrentChange(){
      this.currentPage = this.rechargeData.currentPage = val;
      this.getData(this.activeName);
    },
    handleClick(tab) {
      this.getData(this.activeName);
    },
    getData(activeName) {
      this.axios
        .get("/api/" + activeName + "/getData", {
          params: {
            accountid: this.$store.state.user.userData.id,
            pagesize: this.pageSize,
            currentpage: this.currentPage
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            if (activeName == "payment") {
              console.log(res.data.data);
              this.paymentData.listData=res.data.data.listdata
              this.paymentData.totalRows = parseInt(res.data.data.totalrows);
              this.paymentData.currentPage = parseInt(
                res.data.data.currentpage
              );
              this.paymentData.pageSize = parseInt(res.data.data.pagesize);
            } else {
              console.log(res.data.data)
              this.rechargeData.listData = res.data.data.listdata;
              this.rechargeData.totalRows = parseInt(res.data.data.totalrows);
              this.rechargeData.currentPage = parseInt(
                res.data.data.currentpage
              );
              this.rechargeData.pageSize = parseInt(res.data.data.pagesize);
            }
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
    }
  }
};
</script>
sty;<style lang="less" scoped>
</style>
