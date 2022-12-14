import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

import { SideMenuOpened } from "@/store";
import { drawerWidth } from "@/store/constant";
import Header from "@/layout/MainLayout/Header"
import Sidebar from "@/layout/MainLayout/Sidebar"
import Customization from "@/layout/Customization";

//@ts-ignore
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    //@ts-ignore
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

const MainLayout =()=>{
    const theme =useTheme();
    //???hook???????????????????????????????????????boolean
    const matchDownMd =useMediaQuery(theme.breakpoints.down('lg'));

    // ??????????????????????????????
    const [opened,setOpened] =useRecoilState(SideMenuOpened);
    const handleSideMenuToggle =()=>{
        setOpened(!opened);
    }

    useEffect(()=>{
        //??????????????????????????????????????????
        setOpened(!matchDownMd); //????????????1200?????????
    },[matchDownMd])

    return (
        <Box sx={{display:"flex"}}>
            <CssBaseline />
            {/*  header  */}
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        bgcolor: theme.palette.background.default,
                        transition: opened ? theme.transitions.create('width') : 'none'
                    }}
                >
                    <Toolbar>
                        <Header handleLeftDrawerToggle={handleSideMenuToggle} />
                    </Toolbar>
                </AppBar>
            {/*  sideMenu  */}
                <Sidebar drawerOpen={opened} drawerToggle={handleSideMenuToggle} />

            {/*  main content  */}
            {/*@ts-ignore*/}
            <Main theme={theme} open={opened}>
                {/* breadcrumb */}
                {/*<Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />*/}
                <Outlet />
            </Main>
            <Customization></Customization>
        </Box>
    )
}

export default MainLayout;