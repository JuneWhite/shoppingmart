<template>
    <div class="container">
        <div class="page  line-height-30">
        <el-row :gutter="10">
            <el-col :span="5" style="text-align:center;">
              <h4>帮助手册</h4>
            </el-col>
            <el-col :span="18">
               <el-row>
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                              <el-breadcrumb-item :to="{ path: '/' }">平台首页</el-breadcrumb-item>
                              <el-breadcrumb-item>帮助手册</el-breadcrumb-item>
                            </el-breadcrumb>
                </el-row>
                常见问题 <br />
                给组件绑定的事件为什么无法触发？<br />
                如何在 Table 组件的每一行添加操作该行数据的按钮？<br />
                Tree 组件的 `render-content` 和 Table 组件的 `render-header` 怎么用？<br />
                所有组件的任意属性都支持 `.sync` 修饰符吗？<br />
                你们的文档怎么偷偷更新了？<br />
                在项目中引入 Element，但是 CSS 报错/字体文件报错/组件没有样式是什么原因？<br />
                将 Element 克隆至本地，运行时为何会报错/跑不起来？<br />
                FAQ<br />
                Why are my event listeners not working?<br />
                How do I add buttons in each row of Table to operate data of that row?<br />
                How do `render-content` of Tree and `render-header` of Table work?<br />
                Can I use `.sync` modifier on every attribute?<br />
                When do you update documentations of Element?<br />
                I imported Element in my project, but why does it report CSS error/font file error/components have no style?<br />
                I cloned Element's repo, but failed to run it. How do I solve it?<br />
                Preguntas más frecuentes<br />
                Porque mis receptores de eventos no funcionan?<br />
                Como agrego botones en cada linea de una tabla para que operen en los datos de esa linea?<br />
                Como funcionan `render-content` de `Tree` y `render-header` de `Table`?<br />
                Puedo usar el modificador `.sync` con cada atributo?<br />
                Cuando añaden a la documentación de `Element`?<br />
                Importé `Element` a mi proyecto pero tengo errores con `CSS` y/o fuentes y mis componentes no tienen ningún estilo?<br />
                Hice un clon del repositorio de `Element` pero no arranca. Como lo resuelvo?<br />
            </el-col>
        </el-row>
        </div>
    </div>
</template>
<script>
export default {
    name: 'help',
    data() {
        return {
        }
    }
}
</script>
<style scoped>
.h4{border-bott:1px solid #eee;}
.el-breadcrumb{ line-height:50px; background:#eee; padding-left:20px; margin:10px auto;}
</style>
