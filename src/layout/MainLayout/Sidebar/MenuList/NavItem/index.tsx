import {forwardRef, ReactElement, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useRecoilState} from "recoil";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Chip,
    ChipProps,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
} from '@mui/material';

import { TablerIcon } from "@tabler/icons";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { SideMenuItemOpened,SideMenuOpened } from "@/store";
import { MenuItemType } from "@/menu/menuType";

interface NavItemProps {
    item:MenuItemType,
    level:number
}

const NavItem =({item,level}:NavItemProps)=>{
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    // 获取默认展开的侧边菜单按钮
    const [itemsOpened,setItemsOpened] =useRecoilState(SideMenuItemOpened);
    const [sideMenuOpened,setSideMenuOpened] =useRecoilState(SideMenuOpened);

    const Icon =item.icon;
    const itemIcon =item?.icon ? (
        //@ts-ignore
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: itemsOpened.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: itemsOpened.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    // 和ListItemButton（用于渲染list中的按钮）配合渲染链接
    let listItemProps = {
        component: forwardRef(
            (props, ref) =>
                //@ts-ignore
                <Link ref={ref} {...props} to={item.url} target={itemTarget} />
        )
    };
    if (item?.external) {
        //@ts-ignore
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id:string) => {
        setItemsOpened([item.id]);
        if(matchesSM){
            // 如果页面过小，则点击之后需要关于菜单
            setSideMenuOpened(false);
        }
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
           setItemsOpened([item.id])
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `$12px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={itemsOpened.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={itemsOpened.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        //@ts-ignore
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
        </ListItemButton>
    );

}

export default NavItem;