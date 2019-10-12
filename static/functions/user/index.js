// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
  

  return await db.collection("shujuku3").update({
    data:{
      name:'aaa'
    }
    }).then(res=>{
      console.log(res)
    }).catch(console.error)
  

  /*
  return {
    
  
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    
  }
  */
}