const fs =require('fs')

// 实现原理：很简单，让js进程挂起ms即可（如何挂起？可以通过定时器，网络请求等，这里使用Promise只是较之回调更优雅）
function sleep(ms){
    if (!ms) return Promise.resolve();
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        },ms);
    })
}

module.exports =async function (ctx){
    const {mockFileName,mockDir} =ctx._resolve_context;

    delete require.cache[require.resolve(mockFileName)]

    let context
    try{
        context =require(mockFileName)
        if (context instanceof Function){
            context =await context(ctx);
        }
        await sleep(100)
        ctx.body =context;
    }catch (e){
        ctx.body =e.toString()
        ctx.status =400
    }
}