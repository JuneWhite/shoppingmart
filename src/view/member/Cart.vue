<template>
  <div>
    <el-button type="danger" @click="shop" class="delete-btn">批量结算</el-button>
    <el-button-group class="delete-btn" style="float:right">
      <el-button type="primary" @click="deleteMore">批量删除</el-button>
      <el-button type="primary" @click="deleteAll">清空购物车</el-button>
    </el-button-group>

    <el-table
      ref="multipleTable"
      :data="this.$store.getters['cart/getCartData']"
      tooltip-effect="dark"
      style="width: 100%"
      :summary-method="getSummaries"
      show-summary
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="图片" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.productionphoto" alt style="height:60px;float:left" />
        </template>
      </el-table-column>
      <el-table-column prop="addtime" label="日期" width="160">
        <template slot-scope="scope">{{ scope.row.addtime|timeformate('yyyy/MM/dd hh:mm:ss') }}</template>
      </el-table-column>
      <el-table-column prop="productiontitle" label="商品名称" width="160"></el-table-column>
      <el-table-column prop="productionsize" label="尺码" width="80"></el-table-column>
      <el-table-column prop="productioncolor" label="颜色" width="80"></el-table-column>
      <el-table-column prop="productionprice" label="价格" width="80"></el-table-column>
      <el-table-column prop="productionnum" label="数量" width="80"></el-table-column>
      <el-table-column prop="productionnum" label="金额" width="80">
        <template slot-scope="scope">
          {{scope.row.productionnum*scope.row.productionprice}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.row.id)" type="danger" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import filters from "@/filters";
export default {
  name: "Cart",
  data() {
    return {
      ids: [],
      pids:[],
      cartTotal:''
    };
  },
  created(){
    this.cartTotal=this.$store.getters['cart/cartTotal'];
  },
  // 合计总价计算属性
  computed:{
    total(){
      return this.$store.getters['cart/cartTotal'];
    }
  },
  methods: {
    // 复选框变化时记录所选产品
    handleSelectionChange(val) {
      let ids = [];
      let pids=[]
      val.forEach(item => {
        ids.push(item.id);
        pids.push(item.productionid)
      });
      this.ids = ids;
      this.pids = pids;
    },
    // 单项删除
    deleteRow(id) {
      this.$store.dispatch("cart/deleteCart", [id]);
    },
    // 批量删除——采用id记录购物车产品
    deleteMore() {
      if(this.ids.length==0){
        this.$message({
          type:'warning',
          message:'至少选择一项'
        })
      }else{
        console.log(this.ids);
        this.$store.dispatch("cart/deleteCart", this.ids);
      }      
    },
    // 清空购物车
    deleteAll() {
      this.$store.dispatch("cart/deleteCart", []);
    },
    // 批量购买——采用产品id记录所选项
    shop() {
      let arr = this.$store.state.cart.cartData;
      console.log(this.pids)
      let newArr = [];
      if (this.pids.length > 0) {
        for (let i in this.pids) {
          arr.forEach(item=>{
            if(item.productionid==this.pids[i]){
              newArr.push(item)
            }
          })
        }
        this.$store.commit('cart/resetOrder')
        newArr.forEach(item => {
          this.$store.dispatch("cart/addOrder", {
            accountid: item.accountid,
            productionid: item.productionid,
            productionnum: item.productionnum,
            productioncolor: item.productioncolor,
            productionsize: item.productionsize
          });
        })
        this.$router.push('/order/'+this.pids)
      }
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 2) {
          sums[index] = "合计";
            return;
        }else  if (index == 8) {
          sums[index] = this.total+"元";
          return;
        }       
        if (index == 7) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += " 件";
          } else {
            sums[index] = "";
          }
        } 
      });
      return sums;
    }
  },
  filters
};
</script>
<style scoped>
.delete-btn {
  margin: 10px 0;
}
</style>
