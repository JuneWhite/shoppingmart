<template>
  <div class="cartContainer">
    <div class="page">
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :summary-method="getSummaries"
          show-summary
          height="600px"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column label="商品信息" width="450">
            <template slot-scope="scope">
              <img :src="scope.row.productionphoto" alt style="height:80px;float:left" />
              <span class="productionDesc">{{ scope.row.productiontitle }}</span>
              <div class="cartCard">
                <img src="@/assets/images/cart1.png" alt />
                <img src="@/assets/images/cart2.png" alt />
                <img src="@/assets/images/cart3.png" alt />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productionprice" label="单价" width="150"></el-table-column>
          <el-table-column prop="num" label="数量" width="200">
            <template slot-scope="scope">
              <el-input-number size="mini" v-model="scope.row.num"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="金额" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="jiesuan">
        <el-button type="danger">去结算</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cart",
  data() {
    return {
      tableData: [
        {
          id: 19,
          categoryid: 36,
          productiontitle: "清新文艺感GUAN东女士春季镂空白色毛衣",
          num: "9",
          money: "1200",
          productionprice: "299.00",
          productionphoto: "/uploads/production/5d26f35cbf9a7.jpg"
        },
        {
          id: 19,
          categoryid: 36,
          productiontitle: "清新文艺感GUAN东女士春季镂空白色毛衣",
          num: "9",
          money: "1200",
          productionprice: "299.00",
          productionphoto: "/uploads/production/5d26f35cbf9a7.jpg"
        },
        {
          id: 19,
          categoryid: 36,
          productiontitle: "清新文艺感GUAN东女士春季镂空白色毛衣",
          num: "9",
          money: "1200",
          productionprice: "299.00",
          productionphoto: "/uploads/production/5d26f35cbf9a7.jpg"
        }
      ]
    };
  },
  created(){
    this.tableData
  },
  computed: {},
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 2) {
          sums[index] = "合计";
          return;
        }
        if (index === 1 || index === 0) {
          sums[index] = "";
          return;
        }
        if (index == 5) {
          sums[index] = "去结算";
          return;
        }
        if (index == 3) {
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
            sums[index] = "N/A";
          }
        } else {
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
            sums[index] += " 元";
          } else {
            sums[index] = "N/A";
          }
        }
      });
      return sums;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style scoped>
.productionDesc {
  display: inline-block;
  overflow: hidden;
  margin-left: 10px;
}
.cartCard {
  padding-left: 10px;
  margin-top: 20px;
  overflow: hidden;
}
.cartCard img {
  margin-right: 5px;
}
.page{
  position: relative;
}
.jiesuan{
  position: absolute;
  right: 20px;
  bottom: 5px;
  z-index: 999;
}
</style>
