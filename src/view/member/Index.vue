<template>
  <div class="page">    
    <el-row>
      <el-col :span="5">
        <LeftSide />
      </el-col>
      <el-col :span="19">
        <div class="memberInfo">
          <el-page-header @back="goBack" content="会员中心" class="pageHeader"></el-page-header>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LeftSide from './LeftSide'
export default {
  data() {
    return {
      userData:{},
      cartdata:[]
    };
  },
  created(){
    this.userData=this.$store.state.user.userData
    this.cartData=this.$store.state.cart.cartData
    console.log(this.userData)
  },
  activated(){
    // this.$router.push('/member/cart')
  },
  mounted(){
    // alert(1)
		// this.$router.push('/member/cart')
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  components:{
    LeftSide
  }
};
</script>
<style scoped>
.pageHeader {
  padding: 10px 0;
  /* background-color: #eee; */
  border-top: 1px solid #eeeeee;
}
.memberInfo{
  /* padding: 10px; */
}
</style>
