<template>
  <div>
    <div class="bannerContainer">
      <div class="page bannerBox">
        <!-- 菜单 -->
        <div class="subnav">
          <div class="children">
            <li v-for="item in subData" :key="item.id">
              <div class="subLi">
                <i class="iconfont">{{item.icon}}</i>
                <span>{{item.categoryname}}</span>
                <i class="el-icon-arrow-right"></i>
              </div>
              <div class="subInfo">
                <li v-for="subitem in item.children" :key="subitem.id">
                  <router-link
                    :to="'/p/'+item.id+'?sid='+subitem.neworder|replace('0-'+item.id+'-')"
                  >
                    <i class="iconfont">{{subitem.icon}}</i>
                    {{subitem.categoryname}}
                  </router-link>
                </li>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="bannerSwiper">
      <el-carousel indicator-position="none" height="410px">
        <el-carousel-item v-for="item in banndeData" :key="item.src">
          <router-link :to="'/p/'+item.link.id">
            <img :src="item.src" alt class="bannerImg" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 商品展示区 -->
    <div class="showBox">
      <!-- 潮流女装 -->
      <el-row class="page">
        <h3 class="one">1F 潮流女装</h3>
        <el-row v-if="f1goodsData.length!=0">
          <el-col :span="5" class="proSub">
            <router-link :to="{name:'detail',params:{id:f1goodsData[0].id}}">
              <el-image :src="f1goodsData[0].productionphoto" lazy>
                <div slot="placeholder" class="image-slot">
                  <img src="@/assets/images/loading.gif" />
                </div>
              </el-image>
            </router-link>
          </el-col>
          <el-col :span="19">
            <el-row>
              <el-col :span="6" v-for="(item,i) in f1goodsData" :key="item.id">
                <router-link :to="{name:'detail',params:{id:item.id}}" v-if="i>0">
                  <div class="proInfo">
                    <div class="proCover">
                      <!-- <img :src="item.productionphoto" alt /> -->
                      <el-image :src="item.productionphoto" lazy>
                        <div slot="placeholder" class="image-slot">
                          <img src="@/assets/images/loading.gif" />
                        </div>
                      </el-image>
                    </div>
                    <div class="productionInfoBox">
                      <div class="proTitle">
                        <span>{{item.productiontitle}}</span>
                      </div>
                      <div class="proPrice">
                        <span>{{item.productionprice}}</span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <!-- 时尚男装 -->
      <el-row class="page">
        <h3 class="two">2F 时尚男装</h3>
        <el-row v-if="f2goodsData.length!=0">
          <el-col :span="5" class="proSub">
            <router-link :to="{name:'detail',params:{id:f2goodsData[0].id}}">
              <el-image :src="f2goodsData[0].productionphoto" lazy>
                <div slot="placeholder" class="image-slot">
                  <img src="@/assets/images/loading.gif" />
                </div>
              </el-image>
            </router-link>
          </el-col>
          <el-col :span="19">
            <el-row v-if="f2goodsData">
              <el-col :span="6" v-for="(item,i) in f2goodsData" :key="item.id">
                <router-link :to="{name:'detail',params:{id:item.id}}" v-if="i>0">
                  <div class="proInfo">
                    <div class="proCover">
                      <el-image :src="item.productionphoto" lazy>
                        <div slot="placeholder" class="image-slot">
                          <img src="@/assets/images/loading.gif" />
                        </div>
                      </el-image>
                    </div>
                    <div class="productionInfoBox">
                      <div class="proTitle">
                        <span>{{item.productiontitle}}</span>
                      </div>
                      <div class="proPrice">
                        <span>{{item.productionprice}}</span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <!-- 运动装 -->
      <el-row class="page">
        <h3 class="three">3F 运动装</h3>
        <el-row v-if="f3goodsData.length!=0">
          <el-col :span="5" class="proSub">
            <router-link :to="{name:'detail',params:{id:f3goodsData[0].id}}">
              <el-image :src="f3goodsData[0].productionphoto" lazy>
                <div slot="placeholder" class="image-slot">
                  <img src="@/assets/images/loading.gif" />
                </div>
              </el-image>
            </router-link>
          </el-col>
          <el-col :span="19">
            <el-row v-if="f3goodsData">
              <el-col :span="6" v-for="(item,i) in f3goodsData" :key="item.id">
                <router-link :to="{name:'detail',params:{id:item.id}}" v-if="i>0">
                  <div class="proInfo">
                    <div class="proCover">
                      <el-image :src="item.productionphoto" lazy>
                        <div slot="placeholder" class="image-slot">
                          <img src="@/assets/images/loading.gif" />
                        </div>
                      </el-image>
                    </div>
                    <div class="productionInfoBox">
                      <div class="proTitle">
                        <span>{{item.productiontitle}}</span>
                      </div>
                      <div class="proPrice">
                        <span>{{item.productionprice}}</span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <!-- 女鞋 -->
      <el-row class="page">
        <h3 class="four">4F 精美女鞋</h3>
        <el-row v-if="f4goodsData.length!=0">
          <el-col :span="5" class="proSub">
            <router-link :to="{name:'detail',params:{id:f4goodsData[0].id}}">
              <el-image :src="f4goodsData[0].productionphoto" lazy>
                <div slot="placeholder" class="image-slot">
                  <img src="@/assets/images/loading.gif" />
                </div>
              </el-image>
            </router-link>
          </el-col>
          <el-col :span="19">
            <el-row v-if="f4goodsData">
              <el-col :span="6" v-for="(item,i) in f4goodsData" :key="item.id">
                <router-link :to="{name:'detail',params:{id:item.id}}" v-if="i>0">
                  <div class="proInfo">
                    <div class="proCover">
                      <el-image :src="item.productionphoto" lazy>
                        <div slot="placeholder" class="image-slot">
                          <img src="@/assets/images/loading.gif" />
                        </div>
                      </el-image>
                    </div>
                    <div class="productionInfoBox">
                      <div class="proTitle">
                        <span>{{item.productiontitle}}</span>
                      </div>
                      <div class="proPrice">
                        <span>{{item.productionprice}}</span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getIds, getGoodsData } from "@/function";
import filters from "@/filters";
export default {
  data() {
    return {
      subData: [],
      iconData: [
        { id: 3, icon: "\ue60a" },
        { id: 34, icon: "\ue681" },
        { id: 40, icon: "\ue60e" },
        { id: 45, icon: "\ue608" }
      ],
      banndeData: [
        {
          link: { name: "list", id: "3" },
          src: require("@/assets/images/banner1.jpg")
        },
        {
          link: { name: "list", id: "34" },
          src: require("@/assets/images/banner2.jpg")
        },
        {
          link: { name: "list", id: "40" },
          src: require("@/assets/images/banner3.jpg")
        },
        {
          link: { name: "list", id: "45" },
          src: require("@/assets/images/banner4.jpg")
        }
      ],
      f1goodsData: [],
      f2goodsData: [],
      f3goodsData: [],
      f4goodsData: []
    };
  },
  created() {
    this.addIcon(this.$store.state.nav.navData);
    this.goodsDataInit();
  },
  methods: {
    addIcon(data) {
      for (let i in data) {
        for (let j in this.iconData) {
          if (data[i].id == this.iconData[j].id) {
            data[i].icon = this.iconData[j].icon;
          }
        }
        if (data[i].children) {
          this.addIcon(data[i].children);
        }
      }
      this.subData = data;
    },
    goodsDataInit() {
      let f1Id = getIds(34, this.$store.state.nav.navData);
      let f2Id = getIds(3, this.$store.state.nav.navData);
      let f3Id = getIds(40, this.$store.state.nav.navData);
      let f4Id = getIds(45, this.$store.state.nav.navData);
      getGoodsData(f1Id, 9)
        .then(res => {
          this.f1goodsData = res.data.data.listdata;
          console.log(this.f1goodsData);
        })
        .catch(error => {
          console.log(error);
        });
      getGoodsData(f2Id, 9)
        .then(res => {
          this.f2goodsData = res.data.data.listdata;
        })
        .catch(error => {
          console.log(error);
        });
      getGoodsData(f3Id, 9)
        .then(res => {
          this.f3goodsData = res.data.data.listdata;
        })
        .catch(error => {
          console.log(error);
        });
      getGoodsData(f4Id, 9)
        .then(res => {
          this.f4goodsData = res.data.data.listdata;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  filters
};
</script>
<style scoped>
.el-image {
  height: 100%;
}
.el-image img,
.el-image__inner {
  width: 100% !important;
}
.icon {
  width: 30px;
}
.bannerContainer {
  width: 100%;
  /* position: absolute; */
  /* position: fixed; */
  /* float: left; */
}
.bannerBox {  
  display: flex;    
}
.subnav {
  width: 190px;
  background-color: rgba(124, 113, 113, 0.7);
  height: 360px;
  z-index: 99;
}
.bannerSwiper {
  /* position: absolute; */
  /* top: 185px; */
  position: relative;
  top: -360px;
  width: 100%;
  z-index: -1;
  height: 360px;
  background-color: #ebe2c3;
  margin-bottom: -360px;
}
.bannerSwiper img {
  display: block;
  margin: 0 auto;
}
.subLi {
  display: flex;
  font-size: 16px;
  line-height: 40px;
  align-items: center;
  padding: 0 10px;
  color: white;
}
.children > li :hover {
  background-color: #fff;
  color: red;
}
.children li:hover .subInfo {
  display: block;
}
.subLi span {
  margin-left: 10px;
  flex: 1;
}
.children {
  position: relative;
}
.subInfo {
  display: none;
  position: absolute;
  z-index: 10;
  left: 190px;
  top: 0;
  width: 500px;
  height: 410px;
  opacity: 0.7;
  background-color: #fff;
}
.subInfo a {
  text-decoration: none;
}
.subInfoChildren {
  background-color: #ccc;
  margin-left: 50px;
}
.subInfo > li {
  display: inline-block;
  widows: 100px;
  font-size: 16px;
  line-height: 40px;
  padding: 0 20px;
  color: #000;
}
.subInfo > li:hover {
  color: red;
  background-color: lightgoldenrodyellow;
  font-weight: bold;
}
.one {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  background-image: gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.two {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgb(58, 33, 199)),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  background-image: gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgb(58, 33, 199)),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.three {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgb(56, 49, 49)),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  background-image: gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgb(56, 49, 49)),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.four {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgb(234, 238, 15)),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  background-image: gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgb(234, 238, 15)),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
/* .showBox{
  position: relative;
  top: -360px;
  margin-bottom: -360px;
} */
</style>