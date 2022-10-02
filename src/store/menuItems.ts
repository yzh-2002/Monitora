// 侧边菜单栏的配置文件
import { IconDashboard } from '@tabler/icons';

const dashboard ={
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: IconDashboard,
            breadcrumbs: false
        }
    ]
}