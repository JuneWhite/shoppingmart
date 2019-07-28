<template>
  <span>
    <el-dialog title="用户密码修改" :visible.sync="dialogFormVisible" @close="handleClose">
      <!-- 表单 -->
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input placeholder="请输入新密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="repassword">
          <el-input placeholder="请再次输入密码" v-model="form.repassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <!-- 确认按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>
export default {
  name: "Add",
  data() {
    return {
      form: {
        id: "",
        username: "",
        password: "",
        repassword: ""
      },
      dialogFormVisible: true,
      formLabelWidth: "80px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (value != this.form.password) {
                callback(new Error("确认密码不正确"));
              } else {
                callback();
              }
            }.bind(this),
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.form.username=this.$store.state.user.userData.username
  },
  methods: {
    postAdimnData() {
      this.axios
        .post("/api/user/edit", {
          params: {
            password: this.form.password,
            username: this.form.username,
            id: this.form.id
          }
        })
        .then(function(response) {
          if (response.data.code == 0) {
            this.$msg.sucess(this)
          } else {
            this.$msg.error(this)
          }
        })
        .catch(error => {
          this.$msg.error(this)
        });
    },
    handleClose() {
      this.$router.go(-1);
    },
    handleCancel() {
      this.dialogFormVisible = false;
    },
    submitForm() {      
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.postAdimnData();
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
