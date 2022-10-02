// 侧边菜单列表中的item（无子节点），还有一种带子节点的为NavCollapse
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

export interface ItemType {
    id:string, //用于标识Item，和SideMenuItemOpened相关联
    icon?:TablerIcon, //图标组件
    title?:string,
    url?:string, //点击按钮跳转到对应的url
    breadcrumbs?:boolean, //
    target?:boolean, //指定链接打开方式（_self:当前窗口，_blank:在新窗口打开）
    external?:boolean //决定跳转方式，a或Link（感觉有点奇怪...）
    disabled?:boolean, //是否禁用该按钮
    caption?:string, //
    chip?:ChipProps, //
}

interface NavItemProps {
    item:ItemType,
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
       // 点击之后，将其id添加到item展开数组中
        // @ts-ignore
        if (itemsOpened.indexOf(id)==-1){
            // @ts-ignore
            setItemsOpened(itemsOpened.concat([id]));
        }
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
        // 如果找到
        if (currentIndex > -1) {
            // @ts-ignore
            if (itemsOpened.indexOf(id)==-1){
                // @ts-ignore
                setItemsOpened(itemsOpened.concat([id]));
            }
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
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );

}

export default NavItem;