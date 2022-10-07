//TODO:从Mock处获取数据
import {Node, Link, generateNode} from "./utils"

interface combo{
    id:string,
    label:string,
    type:string,
    fixSize:number | Array<number>
}

export interface TopoData {
    nodes:Array<Node>,
    edges:Array<Link>,
    combos:Array<combo>
}

const nodes =['camera','switch','server','computer'];

//TODO:Data类型？？
export const TopoData=(Data:any):TopoData=>{
    let res ={
        nodes:[],
        edges:[],
        combos:[]
    }
    res.edges =Data['links'];
    res.combos =Data['combos'];
    for(let i=0;i<nodes.length;i++){
        for (let j=0;j<Data[nodes[i]].length;j++){
            const temp =Data[nodes[i]][j]
            //@ts-ignore
            res.nodes.push(generateNode({...temp,img:nodes[i].toUpperCase()}))
        }
    }

    return res;
}