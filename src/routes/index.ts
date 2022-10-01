import { lazy } from "react"
import  Loadable  from "@/components/Loadable";

// 首页路由
const DashboardDefault =Loadable(lazy(()=>import("@/views/Dashboard/Dashboard")));

//


//
export const routes =[
    {
        path:"/",
        element: DashboardDefault({}),
        // children:[
        //     {
        //         path:"/",
        //         element: "<DashboardDefault />",
        //     }
        // ]
    }
]