import {
    atom
} from "recoil"

import { config } from "@/config"

// 系统的主题颜色
export const Color =atom({
    key:"MonitoraColor", //获取该状态的id，确保唯一
    default:config.colorDefault
})

// 系统的主题字体样式
export const FontStyle =atom({
    key:"MonitoraFont",
    default:config.fontFamily
})

// 首页左侧菜单栏的收起与折叠
export const SideMenuOpened =atom({
    key:"SideMenuOpened",
    default:true
})

// 首页左侧菜单栏默认展开的menuItem
export const SideMenuItemOpened =atom({
    key:"SideMenuItemOpened",
    default:[]
})