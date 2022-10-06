// 定义menu的类型

//这个才是渲染的菜单按钮的类型
import {TablerIcon} from "@tabler/icons";

export interface MenuItemType {
    id:string,
    title:string,
    caption?:string,
    type:"item" | "collapse",
    icon?:TablerIcon,
    breadcrumbs?:boolean,
    url?:string,
    target?:boolean,
    external?:boolean,
    disabled?:boolean,
    children?:Array<MenuItemType>
}


export interface MenuGroupType {
    id:string,
    title?:string,
    caption?:string,
    type:string,
    icon?:TablerIcon,
    children?:Array<MenuItemType>,
}