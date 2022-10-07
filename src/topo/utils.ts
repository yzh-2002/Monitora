// 创建topo结点及其链路的数据结构

//结点均采用image结点，边则采用默认边，但是边设计到动画操作

import path from "path-browserify"

export const ImageUrl ={
    'COMPUTER':path.resolve("/","/src/assets/network/computer.svg"),
    'SERVER':path.resolve("/","/src/assets/network/server.svg"),
    'CAMERA':path.resolve("/","/src/assets/network/camera.svg"),
    'SWITCH':path.resolve("/","/src/assets/network/switch.svg"),
    'PACKET':path.resolve("/","/src/assets/network/packet.svg")
}

export interface Node {
    id:string,
    img:string,
    type?:string,
    size?:Array<number> | number,
    label?:string,
    comboId?:string
}

export interface Link {
    id:string,
    source:string,
    target:string,
    // label:string
    meta:{
        payload:number
    }
}

export const generateNode=({id,img,type,size,label,comboId}:Node):Node=>{
    return {
        id:id,
        img:new URL(ImageUrl[img as keyof typeof ImageUrl],import.meta.url).href,
        type:"image",
        size:[45,45],
        label:label || '',
        comboId,
    }
}

export const generateLink=({id,source,target,meta}:Link):Link=>{
    return {
        id,
        source,
        target,
        meta
    }
}