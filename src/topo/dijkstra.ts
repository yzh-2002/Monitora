// dijkstra算法选路（为animate服务）
// TODO:使用机器学习进行选路？？
import { Link } from "./utils"

export interface Graph {
    [index:string]:Array<string>
}

export interface payloadTable {
    [index:string]:number
}

//Fixme:图结点仅限于switch，不包括camera，computer和server
export const convertGraph =(data:Array<Link>):Graph=>{
    let res:Graph ={}
    for (let i=0;i<data.length;i++){
        const link =data[i];
        if (link.source.split('-')[0]=='switch' && link.target.split('-')[0]=='switch'){
            if (Object.keys(res).indexOf(link['source'])!=-1){
                res[link['source']].push(link['target'])
            }else{
                res[link['source']] =[];
                res[link['source']].push(link['target']);
            }
            if (Object.keys(res).indexOf(link['target'])!=-1){
                res[link['target']].push(link['source'])
            }else{
                res[link['target']] =[];
                res[link['target']].push(link['source']);
            }
        }
    }
    return res;
}

export const payloadTable =(data:Array<Link>):payloadTable=>{
    let res ={};
    for (let i=0;i<data.length;i++){
        const link =data[i];
        //@ts-ignore
        res[[link.source,link.target].toString()] =link.meta.payload
        //@ts-ignore
        res[[link.target,link.source].toString()] =link.meta.payload
    }
    return res;
}

const INFINITY =1000;

export const dijkstra =(graph:Graph,payloadTable:payloadTable,start:string):Graph=>{
    let known =[start];
    let unknown =[];
    let boundary:Array<string> =[];
    let distance:payloadTable ={} //名称不重要，类型符合即可
    let res ={} //储存起始点到各结点的最短路径
    // 初始化
    const nodes =Object.keys(graph);
    for(let i=0;i<nodes.length;i++){
        // @ts-ignore
        res[nodes[i]] =[start];
        if (nodes[i]!=start) {
            unknown.push(nodes[i]);
        }
    }
    distance[start] =0;
    for (let i=0;i<graph[start].length;i++){
        const item =graph[start][i];
        distance[item] =payloadTable[[start,item].toString()];
        // @ts-ignore
        res[item].push(item);
        known.push(item);
        boundary.push(item);
        unknown.splice(unknown.indexOf(item),1);
    }
    // console.log("未进循环前：",unknown);
    while(unknown.length){ //unknown不为空则一直寻找
        let min =INFINITY; //记录最小值
        let targetBoundary; //属于boundary，用于更新boundary和计算distance
        let minNode; //属于新的boundary
        for (let i=0;i<boundary.length;i++){
            const node =boundary[i];
            for (let j=0;j<graph[node].length;j++){
                const temp =graph[node][j];
                if (known.indexOf(temp)==-1){ // 排除已知的
                    if (payloadTable[[node,temp].toString()]<min){
                        min =payloadTable[[node,temp].toString()];
                        targetBoundary =boundary[i];
                        minNode =temp;
                    }
                }
            }
        }
        // console.log('minNode:',minNode);
        //更新konwn,unkown,boundary,distance,res....
        known.push(minNode as string);
        unknown.splice(unknown.indexOf(minNode as string),1);
        //Fixme:boundary不应该删除
        // boundary.splice(boundary.indexOf(targetBoundary as string),1);
        boundary.push(minNode as string);
        distance[minNode as string] =distance[targetBoundary as string]+min;
        //@ts-ignore
        res[minNode] =[]
        //@ts-ignore
        res[minNode] =res[targetBoundary].concat([minNode]);
    }
    return res;
}

// 图结点仅限于switch，因此需要获取设备直接相连的switch
export const getDirectSwitch =(device:string,data:Array<Link>):string=>{
    for (let i=0;i<data.length;i++){
        const link=data[i];
        if (link.source==device){
            return link.target;
        }else if(link.target==device){
            return link.source;
        }
    }
    return '';
}