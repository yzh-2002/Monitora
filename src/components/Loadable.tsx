import { Suspense, ComponentType } from "react" //常与懒加载结合，在未渲染出目标组件前指定过渡组件

import { Loader } from "./Loader"

//TODO:props的ts类型？？
//@ts-ignore
const Loadable =(Component:ComponentType)=>(props)=>(
        <Suspense fallback={<Loader />}>
            <Component {...props}/>
        </Suspense>
)

export default Loadable;