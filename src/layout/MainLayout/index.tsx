import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

import { SideMenuOpened } from "@/store";


const MainLayout =()=>{
    const theme =useTheme();
    //该hook查询是否满足相应媒介，返回boolean
    const matchDownMd =useMediaQuery(theme.breakpoints.down('lg'));

    // 左侧菜单的收起与折叠
    const [opened,setOpened] =useRecoilState(SideMenuOpened);
    const handleSideMenuToggle =()=>{
        setOpened(!opened);
    }

    useEffect(()=>{
        //根据媒介大小设置菜单是否收起
        setOpened(!matchDownMd); //媒介小于1200则收起
    },[matchDownMd])

    return (
        <Box sx={{display:"flex"}}>
            <CssBaseline>
            {/*  header  */}
                <AppBar>

                </AppBar>
            {/*  sideMenu  */}
                <></>
            {/*  main content  */}

            </CssBaseline>
        </Box>
    )

}