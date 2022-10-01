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
