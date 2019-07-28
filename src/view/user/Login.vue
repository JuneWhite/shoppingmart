<template>
  <el-container>
    <el-row>
      <div>  
        <img src="@/assets/images/login.jpg" alt="">    
      </div>
      <div>
        <div class="login">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="手机号：" prop="telphone">
              <el-input placeholder="请输入手机号" v-model="ruleForm.telphone"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
              <el-input placeholder="请输入密码" v-model="ruleForm.pass" show-password></el-input>
            </el-form-item>
            <el-checkbox v-model="ruleForm.checked">记住账号和密码</el-checkbox>
            <br />
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
          </el-form>
        </div>      
      </div>
    </el-row>
  </el-container>
</template>
<script>
import { setInterval, setTimeout } from "timers";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      ruleForm: {
        checked: true,
        telphone:'',
        pass: ""
			},			
      rules: {
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
          }
        ]
      }
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.loading = true;
          // 用户登录
          this.userLogin()
        } else {
          return false;
        }
      });
    },
    userLogin(){
      this.axios
        .get("/api/user/login",{
          params:{
            telphone:this.ruleForm.telphone,
            password:this.ruleForm.pass                
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$store.commit("user/setUserInfo", res.data.data);
            res.data.cartdata.forEach(item=>{
              this.$store.commit("cart/setCartInfo", item);
            })            
            this.$message({
              message: '恭喜你，登录成功！',
              type: 'success'
            });
            this.loading = false;            
            this.$router.push('/')
          } else {
            this.loading = false;
            this.$message({
              message: '用户名或密码错误！',
              type: 'error'
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message({
            message: '服务器忙，请稍后重试！',
            type: 'error'
          });
        });
    }
  }
};
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
.login {
  position: absolute;
  top: 80px;
  right:-80px;
  width: 300px;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px #fff;
}
.login >>> .el-input__inner {
  background-color: #eee;
}
.el-button--primary {
  margin-top: 10px;
  width: 100%;
}
.el-checkbox {
  margin-left: 100px;
}
.el-checkbox{
  margin-right: 70px;
} 
</style>
