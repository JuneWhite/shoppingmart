<template>
  <div>
    <el-table :data="orderData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.children" border style="width: 100%">
            <el-table-column prop="productionphoto" label="图片" width="150">
              <template slot-scope="scope">
                <div class="cover-img">
                  <img :src="scope.row.productionphoto" width="50"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="productiontitle" label="标题"></el-table-column>
            <el-table-column prop="productionprice" label="价格" width="150"></el-table-column>
            <el-table-column prop="productionsize" label="尺码" width="150"></el-table-column>
            <el-table-column prop="productioncolor" label="颜色" width="150"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="ordersn"></el-table-column>
      <el-table-column label="订单金额" prop="totalprice"></el-table-column>
      <el-table-column label="订单状态" prop="paymentstatus">
        <template slot-scope="props">
          <el-button type="success" v-if="props.row.paymentstatus==1" plain size="mini">已支付</el-button>
          <el-button type="danger" v-else plain size="mini">未支付</el-button>
        </template>       
      </el-table-column>
      <el-table-column label="订单时间" prop="addtime">
        <template slot-scope="props">
          <span>{{props.row.addtime|timeformate('yyyy/MM/dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="paymentstatus">
        <template slot-scope="props">
          <el-button type="success" v-if="props.row.paymentstatus!=1" size="mini" @click="keepPay(props.row.ordersn)">继续支付</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="pagesize"
      :total="totalRows"
      :current-page="currentpage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
import filters from '@/filters'
export default {
  name: "Orders",
  filters,
  data() {
    return {
      orderData: [],
      pagesize: 8,
      totalRows: 0,
      currentpage: 1
    };
  },
  created() {
    this.getOrderData();
  },
  activated() {
    this.getOrderData();
  },
  beforeRouteUpdate(to, from, next) {
    this.getOrderData();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderData();
    },
    getOrderData() {
      this.axios
        .get("/api/order/getPageData", {
          params: {
            accountid: this.$store.state.user.userData.id,
            pagesize: this.pagesize,
            currentpage: this.currentPage
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data.data);
            this.totalRows=res.data.data.totalrows
            this.orderData=res.data.data.listdata
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "服务器忙，请稍后重试！"
          });
        });
    },
    keepPay(ordersn){
      console.log(ordersn)
      this.$router.push({
        path:'/payment',
        query:{ordersn:ordersn}
      })
    }
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
