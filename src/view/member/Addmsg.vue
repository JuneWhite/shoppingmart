<template>
  <el-dialog
    title="完善个人信息"
    :visible.sync="dialogVisible"
    width="30%"
    @close="colse"
    :before-close="handleClose"
  >
    <!-- 修改图像弹窗 -->
    <el-dialog
      title="修改图像"
      :visible.sync="dialogImgVisible"
      width="50%">
      <ImgEdit v-on:getImgData="getImgData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogImgVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户信息 -->
    <div class="userInfo">
      <!-- 图像 -->
      <Upload class="avatarUrl" @uploaded="uploadedhandle" :imageUrl="userData.avatarUrl"></Upload>
      <el-form :model="userData">
        <el-form-item label="用户名:" label-width="80px">
          <el-input v-model="userData.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号:" label-width="80px">
          <el-input v-model="userData.telphone" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称:" label-width="80px">
          <el-input v-model="userData.nickName" autocomplete="off" @blur="setUserInfo('nickName')"></el-input>
        </el-form-item>
        <el-form-item label="性别:" label-width="80px">
          <el-radio v-model="userData.gender" :label="1">男</el-radio>
          <el-radio v-model="userData.gender" :label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="用户地址:" label-width="80px">
					<el-cascader
            v-model="value"
            :options="options"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import ImgEdit from "@/view/public/ImgEdit";
import Upload from '@/view/public/Upload'
import City from '@/function/city'
export default {
  data() {
    return {
      dialogVisible: true,
      dialogImgVisible: false,
      userData: {},
      options: City,
      value:[],
      province:'',
      city:''
    };
  },
  created() {
    this.userData = this.$store.state.user.userData;
    this.setValue()    
  },
  methods: {
    setValue(){
      City.forEach(item=>{
        if(item.label==this.userData.province){
          this.value.push(item.value)
          item.children.forEach(itemChildren=>{
            if(itemChildren.label==this.userData.city){
              this.value.push(itemChildren.value)
              this.value.push(itemChildren.children[0].value)
            }
          })
        }
      })
    },
    handleChange(value){
      City.forEach(item=>{
        if(item.value==value[0]){
          this.province=item.label
          item.children.forEach(itemChildren=>{
            if(itemChildren.value==value[1]){
              this.city=itemChildren.label
            }
          })
        }
      })
      this.userData.province=this.province
      this.setUserInfo('province')
      this.userData.city=this.city
      this.setUserInfo('city')
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    colse() {
      this.$router.go(-1);
    },
    getImgData(data) {
      this.imgData = data;
      console.log(this.imgData);
    },
    uploadedhandle(src) {
      this.userData.avatarUrl=src
    },
    handelUpload(){
      this.setUserInfo('avatarUrl')
    },
    setUserInfo(key){
      if(key&&this.userData[key]!=''){
        this.axios.post("/api/User/editUserInfo",{
          params:{
            accountid:this.userData.id,
            [key]:this.userData[key]
          }        
        }).then(res=>{          
          if(res.data.code==0){
            this.$store.commit('user/updateUserInfo',{[key]: this.userData[key]});
          }else{
            // this.$message({
            //   type:'error',
            //   message:res.data.msg
            // })
          }
        }).catch(error=>{
          console.log(error)
          this.$message({
            type:'error',
            message:'服务器忙，请稍后重试！'
          })
        })
      }
    }
  },
  components: {
    ImgEdit,
    Upload
  }
};
</script>
<style scoped>
.userInfo>>>.avatarUrl{
  padding-left: 80px;
}
</style>
