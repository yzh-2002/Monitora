// 实现全局样式配置，用户定制功能（一键换肤，更改字体等等）
import { useState,useEffect } from "react"
import { useRecoilState } from "recoil";

import { Color,FontStyle } from "@/store/index"

// material-ui
import { useTheme } from "@mui/material";
import {
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography
} from "@mui/material";
import { IconSettings } from "@tabler/icons";

const Customization =()=>{
    const theme =useTheme();
    // 获取默认主题颜色和字体
    const [color,setColor] =useRecoilState(Color)
    const [font,setFont] =useRecoilState(FontStyle);

    // 控制自定义按钮的开关
    const [open,setOpen] =useState<boolean>(false);
    const handleToggle =()=>{setOpen(!open);}

    // 全局字体设置
    let initialFont;
    switch (font){
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }
    // 组件内部state
    const [_font,set_Font] =useState<string>(initialFont);
    useEffect(()=>{
        let newFont;
        switch (_font) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        // 更新全局
        setFont(newFont);
    },[_font]);

    // 全局颜色设置

    return (
        <>
        {/* toggle button */}
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    // color={}
                    sx={{

                    }}
                >
                    {/*<AnimateButton type="rotate">*/}

                    {/*</AnimateButton>*/}
                </Fab>
            </Tooltip>
        </>
    )


}

export default  Customization;