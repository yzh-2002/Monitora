const createMockServer =require('./server')

function ViteMockApiPlugin(options){
    let server;
    return {
        name:"rollup-plugin-mock-api",
        buildStart:()=>{
            server =createMockServer(options);
        },
        buildEnd:()=>{
            if(server){
                server.close();
            }
        }
    }
}

module.exports =ViteMockApiPlugin;