import axios from '@/http'

// 获取子项id
const getChildrenId=(arr,data)=>{
  for(let i in data){
    arr.push(data[i].id)
    if(data[i].children){
      getChildrenId(arr,data[i].children)
    }
  }
}

export const getIds= (id,data)=>{
  let idArr=[]
  for(let i in data){
    if(id==data[i].id){
      getChildrenId(idArr,data[i].children)
    }
  }
  idArr.push(parseInt(id))
  return idArr
}

// 获取子项内容
const getChildrenItem=(arr,data,flag)=>{
  for(let i in data){
    data[i].show=flag
    arr.push(data[i])
    if(data[i].children){
      getChildrenItem(arr,data[i].children,false)
    }
  }
}

export const getChildrens= (id,data)=>{
  let childrenArr=[]
  for(let i in data){
    if(id==data[i].id){
      data[i].show=true
      childrenArr.push(data[i])
      getChildrenItem(childrenArr,data[i].children,true)
    }
  }
  console.log(childrenArr)
  return childrenArr
}

// 判断三级分类按钮是否显示
export const btnFlag=(sid,data)=>{
  if(sid){
    let sidArr=sid.split('-')
    let searchId=sidArr[sidArr.length - 1]  
    data.forEach(item=>{
      let arr=item.neworder.split('-')
      let res=arr.some(item=>{
        return item==searchId
      })
      if(res){
        item.show=true
      }
    })
  }  
}


// 获取产品数据
export const getGoodsData=(ids,pagesize,currentpage)=>{
  return axios
    .get("/api/production/getDataByCategoryIds",{
      params: {
        categoryid: ids,
        pagesize: parseInt(pagesize),
        currentpage: parseInt(currentpage)
      }
    })
}

// 面包屑数据获取
const breadcrumbChildren=(fid,arr,data,id)=>{
  for(let j in data){
    if(data[j].id==id){
      let sid=data[j].neworder.replace('0-'+fid+'-','')
      arr.push({
        to:fid+'?sid='+sid,
        name:data[j].categoryname,
      })
    }
  }
}
export const getbreadcrumbData=(id,sid,data)=>{
  let arr=[]
  for(let i in data){
    // 一级分类数据
    if(data[i].id==id){
      arr.push({
        to:data[i].id,
        name:data[i].categoryname
      })
    }
    // 二级分类数据
    if(sid!=undefined){
      let sidArr=[]
      sidArr=sid.split('-')    
      breadcrumbChildren(id,arr,data[i].children,sidArr[0])
      if(sidArr.length>1){
        data[i].children.forEach(item=>{
          if(item.children){
            breadcrumbChildren(id,arr,item.children,sidArr[1])
          }
        })
      }
    }
  }  
  return arr
}

// 详情页面包屑
const findItem=(id,data,item)=>{
  for(let i in data){
    if(data[i].id==id){
      item.push(data[i])
    }else if(data[i].children){      
      findItem(id,data[i].children,item)
    }
  }
}

export const getDetailBreadcrumbData=(id,data)=>{
  let item=[]
  findItem(id,data,item)
  let arr=item[0].neworder.split('-')
  let fid=arr[1]
  let sid=arr[2]
  if(arr.length>3){
    sid=arr[2]+'-'+arr[3]
  }
  return getbreadcrumbData(fid,sid,data)
}