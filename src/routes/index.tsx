import { lazy } from "react"
import  Loadable  from "@/components/Loadable";

import MainLayout from "@/layout/MainLayout";

// 首页路由
const DashboardDefault =Loadable(lazy(()=>import("@/views/Dashboard/Dashboard")));

//网络管理路由

// const Topo =Loadable(lazy(()=>import("@/views/NetworkList/Topo")))
// const Topo =lazy(()=>import("@/views/NetworkList/Topo"))
import Topo from "@/views/NetworkList/Topo"

//
export const routes =[
    {
        path:"/",
        //TODO:重定向到首页
        navigator:"dashboard",
        element: <MainLayout />,
        children:[
            {
                path: 'dashboard',
                children: [
                    {
                        path: 'default',
                        element: <DashboardDefault />
                    }
                ]
            },
            {
                path:"networkmanage",
                children: [
                    {
                        path:"topo",
                        element: <Topo></Topo>
                    }
                ]
            }
        ]
    }
]