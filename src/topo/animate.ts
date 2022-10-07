// G6动画效果实现
import G6 from "@antv/g6"
import {Graph} from "@antv/g6";

import {ImageUrl, Link} from "./utils"
import {
    convertGraph,
    payloadTable,
    dijkstra,
    getDirectSwitch
} from "./dijkstra"

const animateEdges ={
    'FORWARD':"animateEdgeForward",
    'BACKWARD':"animateEdgeBackward"
}

interface EdgeIdTable {
    [index:string]:string
}

// 数据包传输动画（自定义动画边）（涉及到一个方向的问题）
const animateEdge =(direct:boolean)=>{
    G6.registerEdge(
        'animateEdge'+(direct ? 'Forward':'Backward' ),
        {
            afterDraw(cfg,group){
                // 获取边
                const edge =group?.get('children')[0];
                // 边的起始点
                const startPoint =edge.getPoint(0);

                const packet =group?.addShape("image",{
                    attrs:{
                        img:new URL(ImageUrl['PACKET'],import.meta.url).href,
                        x:startPoint.x,
                        y:startPoint.y,
                        width:15,
                        height:10
                    },
                    name:"packet"
                });
                // 动画效果实现
                //@ts-ignore
                packet.animate((ratio)=>{
                    // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                    // 根据比例值，获得在边 path 上对应比例的位置。
                    const tmpPoint =direct ? edge.getPoint(ratio) :edge.getPoint(1-ratio);
                    return {
                        x:tmpPoint.x,
                        y:tmpPoint.y
                    }
                }, {
                    repeat:false, //不重复
                    duration:1000
                })
            }
        },
        'line'
    )
}

// 判断边的方向
const isPathForWard =(path:Array<string>,data:Array<Link>):boolean=>{
    for (let i=0;i<data.length;i++){
        const link =data[i];
        if (link.source==path[0] && link.target==path[1]){
            return true;
        }else if(link.target==path[0] && link.target==path[1]){
            return false;
        }
    }
    return false;
}

//TODO:path,paths变量命名含义有点混乱...
//将paths转换为path
const convertPath =(paths:Array<string>):Array<Array<string>> =>{
    let res =[];
    const prePaths =paths.slice(0,-1);
    const aftPaths =paths.slice(1,paths.length);
    for (let i=0;i<paths.length-1;i++){
        const temp =[prePaths[i],aftPaths[i]];
        res.push(temp);
    }
    return res;
}

//获取路径id
const edgeIdTable =(data:Array<Link>):EdgeIdTable=>{
    let res ={};
    for (let i=0;i<data.length;i++){
        const link =data[i];
        //@ts-ignore
        res[[link.source,link.target].toString()] =link.id;
        //@ts-ignore
        res[[link.target,link.source].toString()] =link.id;
    }
    return res;
}

// 动画效果实现(graph为G6画布实例)
export const transPacket =(graph:Graph,OD:Array<string>,data:Array<Link>)=>{
    const start =getDirectSwitch(OD[0],data);
    const end =getDirectSwitch(OD[1],data);
    
    const Graph =convertGraph(data);
    const payTable =payloadTable(data);
    const edgeId =edgeIdTable(data);

    //start到各结点的最短路径
    const paths =dijkstra(Graph,payTable,start);
    const path =paths[end];

    // 注册动画边
    animateEdge(true);
    animateEdge(false);

    // path分方向
    const pathArr =convertPath(path); //仅包含switch
    pathArr.unshift([OD[0],start]);
    pathArr.push([end,OD[1]])

    pathArr.forEach((path,index)=>{
        const id =edgeId[path.toString()];
        console.log("id:",id);
        const item =graph.findById(id);
        console.log('item:',item);
        const flag =isPathForWard(path,data);
        setTimeout(()=>{
            graph.update(item,{
                type:animateEdges[(flag ? 'FORWARD':'BACKWARD')]
            })
            setTimeout(()=>{
                graph.update(item,{
                    type:"line"
                })
            },1000)//1s后取消动画
        },index*1000)
    })

}