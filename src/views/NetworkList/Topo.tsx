import G6, {Graph} from "@antv/g6"
import {useMemo, useEffect, useState, useRef,useCallback} from "react";

import {request} from "@/api/util"
import {TopoData} from "@/topo/topoData";

import MainCard from "@/components/cards/MainCard";
import {Grid, CircularProgress,useTheme,useMediaQuery} from "@mui/material";


//TODO:画布大小未作适配
const Topo =()=>{
    const theme =useTheme();
    // const match =useMediaQuery(theme.breakpoint.up('sm'));
    //G6 图形可视化配置
    const layout =useMemo(()=>{
        return {
            type:'comboCombined',
            preventOverlap:true,
            groupByTypes:false,
            center:[4000,2000],
            //@ts-ignore
            spacing:(node)=>{
                if(node.id.split('-')[0]=='switch'){
                    return 80;
                }
                return 45;
            },
            comboSpacing:45,
        }
    },[])
    const modes =useMemo(()=>{
    return {
        default:['drag-node','drag-combo','collapse-expand-combo',
            //节点提示框和边提示框设置
            {
                type:'tooltip',
                formatText(model:any) {
                    // 提示框文本内容
                    const text = 'id: '+model.id +  "<br/> label: " + model.label;
                    return text;
                },
                offset:100
            },
            {
                type:"edge-tooltip",
                formatText(model:any) {
                    // 边提示框文本内容
                    const text = 'source: ' + model.source + '<br/> target: ' + model.target +
                        '<br /> bandwidth:' +model.meta.payload;
                    return text;
                },
                offset:100
            }
        ]
        }
    },[])

    const topoContainer =useRef(null);
    const [loading,setLoading] =useState<boolean>(false);
    let graph:Graph | null =null;

    const initGraph =useCallback((graph:Graph | null)=>{
        const http =new request({
            method:"get"
        },setLoading)
        http.get("http://127.0.0.1:4000/network").then(data=>{
            if (!graph){
                graph =new G6.Graph({
                    container:topoContainer.current as unknown as HTMLElement,
                    width:1500,
                    height: 650,
                    fitView:true,
                    fitCenter:true,
                    fitViewPadding:[20,40,50,20],
                    layout,
                    modes,
                    defaultEdge:{
                        style:{
                            lineWidth:3
                        }
                    }
                });
                //@ts-ignore
                graph.data(TopoData(data.network));
                graph.render();
            }
        })
    },[])

    //TODO:执行两次，渲染两个Graph
    useEffect(()=>{
        console.log("test");
        initGraph(graph);
    },[])

    // @ts-ignore
    return (<MainCard title="网络拓扑可视化" >
                <Grid xs={12} sm={12}
                      sx={{
                          position:"relative",
                          overflow:"hidden",
                      }}
                >
                    <div ref={topoContainer} style={{
                        width:"100%",
                        height:"650px",
                        //@ts-ignore
                        border:`1px solid ${theme.palette.secondary[200]}`,
                        borderRadius:"12px"
                    }}></div>
                    {loading &&  <CircularProgress
                        size={100}
                        sx={{
                            //@ts-ignore
                            color: theme.palette.secondary[200],
                            position:"absolute",
                            top:350,
                            left:650
                        }}
                    />}
                </Grid>
        </MainCard>)
}

export default Topo;