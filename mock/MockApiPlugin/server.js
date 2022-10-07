const Koa =require("koa");
const http =require('http');
const path =require('path');
const cors =require("cors")

const resolveData =require('./resolveData')
const resolvePath =require('./resolvePath')

function createMockServer({port,root}){
    const cwd =process.cwd()
    if(!root){
        root =path.join(cwd,'mock');
    }

    port =port || 4000;
    const app =new Koa();
    // app.use(cors()); //cors插件貌似有问题....
    app.use(async (ctx,next)=>{
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (ctx.method == 'OPTIONS') {
            ctx.body = 200;
        } else {
            await next();
        }
    })


    app.use(async (ctx,next)=>{
        ctx._root =root;
        return next();
    })
    app.use(resolvePath)
    app.use(resolveData)


    const server =http.createServer(app.callback()).listen(port,()=>{
        console.log()
        console.log(`Mock Server listening as http://localhost:${port}`)
        console.log()
    })

    return server
}

module.exports =createMockServer;