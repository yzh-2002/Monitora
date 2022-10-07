import { MenuGroupType } from "@/menu/menuType";

import {
    IconDashboard,
    IconList,
    IconAccessPoint,
    IconDeviceComputerCamera,
    IconDeviceDesktop,
    IconServer,
    IconAffiliate,
    IconTypography
} from '@tabler/icons';

const dashboard:MenuGroupType ={
    id: 'dashboard',
    title: '首页',
    type: 'group',
    children: [
        {
            id: 'default',
            title: '首页',
            type: 'item',
            url: '/dashboard/default',
            icon: IconDashboard,
            breadcrumbs: false
        }
    ]
}

const networklist:MenuGroupType = {
    id: 'networkmanage',
    title: '网络管理',
    type: 'group',
    children: [
        {
            id: 'networklist',
            title: '网络列表',
            type: 'item',
            icon: IconList,
            url: '/networkmanage/networklist',
        },
        {
            id: 'topo',
            title: '拓扑可视化',
            type: 'item',
            icon: IconAccessPoint,
            url: '/networkmanage/topo',
        },
    ]
};

const datamonitor:MenuGroupType = {
    id: 'datamonitor',
    title: '数据监测',
    type: 'group',
    children: [
        {
            id: 'camera',
            title: '摄像头',
            type: 'item',
            url: '/datamonitor/camera',
            icon: IconDeviceComputerCamera,
            breadcrumbs: false
        },
        {
            id: 'computer',
            title: '用户主机',
            type: 'item',
            url: '/datamonitor/computer',
            icon: IconDeviceDesktop,
            breadcrumbs: false
        },
        {
            id: 'server',
            title: '服务器',
            type: 'item',
            url: '/datamonitor/server',
            icon: IconServer,
            breadcrumbs: false
        },
        {
            id: 'topo',
            title: '网络设备',
            type: 'collapse',
            icon: IconAffiliate,
            children:[
                {
                    id: 'switch',
                    title: '交换机',
                    type: 'item',
                    url: '/topo/switch',
                    breadcrumbs: false
                },
                {
                    id: 'link',
                    title: '链路',
                    type: 'item',
                    url: '/topo/link',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

const sysfeature:MenuGroupType ={
    id: 'sysfeature',
    title: '系统功能',
    type: 'group',
    children:[
        {
            id: 'util-typography',
            title: '功能一',
            type: 'item',
            url: '/utils/util-typography',
            icon: IconTypography,
            breadcrumbs: false
        }
    ]
}

const menuItems ={
    items:[dashboard,networklist,datamonitor,sysfeature] as Array<MenuGroupType>
}

export default menuItems;