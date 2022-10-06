import { lazy } from "react"
import  Loadable  from "@/components/Loadable";

import MainLayout from "@/layout/MainLayout";

// 首页路由
const DashboardDefault =Loadable(lazy(()=>import("@/views/Dashboard/Dashboard")));

//


//
export const routes =[
    {
        path:"/",
        element: <MainLayout />,
        children:[
            {
                path:"/",
                element: "<DashboardDefault />",
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: 'default',
                        element: <DashboardDefault />
                    }
                ]
            }
        ]
    }
]