<template>
  <div class="page el-container">
    <div>  
      <img src="@/assets/images/login.jpg" alt="">    
    </div>
    <div class="register">
      <!-- 表单 -->
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="telphone">
          <el-input placeholder="请输入手机号" v-model="form.telphone" ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
              <el-input placeholder="请输入密码" v-model="form.pass" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
              <el-input placeholder="请再次输入密码" v-model="form.checkPass" show-password></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')" :loading="rigister">确 定</el-button>
            <el-button @click="handleCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name:'useredit',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
		};		
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
		};		
    return {
      form: {
        username:'',
        telphone:'18085485533',
        pass: "123456",
        checkPass: "123456"
      },
      rigister:false,
      dialogFormVisible: true,
      formLabelWidth: '80px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        telphone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11位数字', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    }
  },
  created(){
    
  },
  methods:{
    postUserData(){
      this.axios.post('/api/user/register',{
        params:{
          username:this.form.username,
          telphone:this.form.telphone,
          password:this.form.pass
        }
      }).then((res)=>{
        // 注册成功
        if(res.data.code==0){
          this.rigister=false
          this.$message({
            message: '恭喜你，注册成功！',
            type: 'success'
          });
        }else{
          this.rigister=false
          this.$message({
            message: '服务器忙，请稍后重试！',
            type: 'error'
          });          
        }
      }).catch((error)=>{
        this.rigister=false       
        this.$message({
          message: '服务器忙，请稍后重试！',
          type: 'error'
        });
      })
    },
    handleClose(){
      this.$router.go(-1)
    },
    handleCancel(){
      this.dialogFormVisible=false
      this.$router.push('/')
    },
    submitForm(ruleForm){
      this.dialogFormVisible = false
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.rigister=true
          // 提交注册信息
          this.postUserData()
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
.el-container {
  width: 1200px !important;
  margin: 0 auto !important;
  align-items: center;
  background-color:#F2F2F2;
  margin:30px 0;
  position: relative;
}
.register{
  position: absolute;
  top: 50px;
  right:100px;
  width: 300px;
  height: cale(100%-400px);
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px #fff;
}
</style>
