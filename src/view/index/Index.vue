<template>
  <div v-infinite-scroll="load" style="height:100%;overflow-x:auto">
    <Page-header />
    <keep-alive>
      <transition name="move" mode="out-in">
        <router-view></router-view>  
      </transition>  
    </keep-alive>
    <Page-footer />
  </div>
</template>

<script>
import PageHeader from "@/view/public/PageHeader";
import PageFooter from "@/view/public/PageFooter";
import '@/assets/css/base.css'
export default {
  name: "Index",
  data() {
    return {
			
		};
  },
  created(){
    this.getNavData()
  },
  components: {
    PageHeader,
    PageFooter
	},
	mounted(){
		// this.$router.push('/index')
  },
  methods:{
    load(){
      // alert(1)
      this.$store.commit('setScroll')
    },
    getNavData(){
			this.axios
				.get('/api/category/getChildrenData')
				.then(res=>{
          this.$store.commit('nav/setNavData',res.data.data)
				})
				.catch(error=>{
					console.log(error)
				})
		}
  }
};
</script>

<style scoped>
.bannerImg{
	width: 776px;
	height: 408px;
	display:block;
  margin: 0 auto;
  position: absolute;
  left: 0;
}
</style>
