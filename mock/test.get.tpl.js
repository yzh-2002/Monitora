// 测试mock数据
const range =require('loadsh/range')

module.exports =()=>{
    const res={
        data:{
            test:range(10).map(i=>({
                id:"test-"+i,
                test:"test"
            }))
        }
    }
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(res)
        },1*1000) //构造网络延迟
    })
}