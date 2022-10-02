import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

import { drawerWidth } from '@/store/constant';

import LogoSection from "@/layout/MainLayout/LogoSection";

interface SidebarProps {
    drawerOpen:boolean,
    drawerToggle:Function,
    window:object
}

const Sidebar =({ drawerOpen, drawerToggle, window }:SidebarProps)=>{
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    //
    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    {/*<MenuList />*/}
                    {/*<MenuCard />*/}
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    {/*<MenuList />*/}
                    {/*<MenuCard />*/}
                </Box>
            </MobileView>
        </>
    );
}

export default Sidebar;