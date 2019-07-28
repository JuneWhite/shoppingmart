<template>
  <div class='page'>
    <img src="@/assets/images/error.jpg" alt="">
    <div class="btngroup">
      <el-button type="danger" @click="goIndex">返回首页</el-button>
      <el-button type="primary" @click="goBack">返回上一页</el-button>
    </div>    
  </div>
</template>
<script>
export default {
  name:'error',
  data(){
    return {}
  },
  methods:{
    goIndex(){
      this.$router.push('/')
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
img{
  display:block;
  width: 80%;
  margin: 0 auto;
  height: auto;
}
.page{
  position: relative;
}
.btngroup{
  position: absolute;
  top: 15%;
  left: 40%;
}
</style>
