<template>
  <div>
    <!-- 图像 -->
    <el-row>
      <el-col :span="24">
        <el-card shadow="never" class="tuxiangBox">
          <template>
            <el-row class="demo-avatar demo-basic">
              <el-col :span="24">
                <div class="demo-basic--circle">
                  <div class="block tuxiang">
                    <el-avatar :size="150" :src="userData.avatarUrl"></el-avatar>
                  </div>
                </div>
              </el-col>
            </el-row>
          </template>
          <p>
            <el-tag type="success">{{userData.username}}</el-tag>
            <el-tag type="success">{{userData.telphone}}</el-tag>
          </p>
          <p>
            <el-button type="primary" plain @click="addmsg" class="addmsg">完善信息</el-button>
            <el-button type="danger" @click="recharge">充值</el-button>
          </p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 菜单栏 -->
    <el-row>
      <el-col :span="24">
        <!-- <el-card shadow="never"> -->
          <el-menu default-active="0" class="el-menu-vertical-demo" @select="selected">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">我的购物车</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">我的订单</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">消费记录</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">我的钱包</span>
            </el-menu-item>
          </el-menu>
        <!-- </el-card> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ImgEdit from "@/view/public/ImgEdit";
export default {
  name: "LeftSide",
  data() {
    return {
      userData: {},
      imgData: ""
    };
  },
  created() {
    this.userData = this.$store.state.user.userData;
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    recharge() {
      this.$router.push("/member/recharge");
    },
    // 切换菜单
    selected(index) {
      switch (index) {
        case "1":
          this.$router.push("/member/cart");
          break;
        case "2":
          this.$router.push("/member/orders");
          break;
        case "3":
          this.$router.push("/member/money");
          break;
        case "4":
          this.$router.push("/member");
          break;
        default:
          break;
      }
    },
    // 完善信息
    addmsg() {
      this.$router.push("/member/addmsg");
    },
    // 修改密码
    resetpass() {
      this.$router.push('/member/repass')
    }
  },
  components: {
    ImgEdit
  }
};
</script>
<style scoped>
.tuxiangBox {
  display: flex;
  justify-content: space-around;
}
.tuxiang {
  text-align: center;
}
.addmsg{
  text-align: center;
}
</style>
