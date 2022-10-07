const path =require('path');

function getDatetimeStr (date) {
    if (date instanceof Date && date.valueOf()) {
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const hour = date.getHours().toString().padStart(2, '0')
        const minute = date.getMinutes().toString().padStart(2, '0')
        const second = date.getSeconds().toString().padStart(2, '0')
        const millisecond = date.getMilliseconds().toString().padStart(3, '0')
        return `${year}-${month}-${day} ${hour}:${minute}:${second}:${millisecond}`
    }
}

module.exports =function (ctx,next){
    const root =ctx._root;

    let mockFileName;
    let mockDir;
    const url =new URL(ctx.request.origin +ctx.request.url);
    const method =ctx.method;

    // 输出日志
    console.log(ctx.method,getDatetimeStr(new Date()),url.pathname);

    const { dir, base } = path.parse(url.pathname)
    if(!base){
        ctx.throw(400,'Cannot create mock file for root path');
    }

    mockFileName =path.join(root,dir,`${base}.${method.toLowerCase()}.tpl.js`)
    mockDir =path.join(root,dir);

    ctx._resolve_context ={
        mockFileName,
        mockDir
    }
    return next();
}