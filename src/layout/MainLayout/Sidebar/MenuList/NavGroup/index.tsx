// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '@/layout/MainLayout/Sidebar/MenuList/NavItem';
import NavCollapse from '@/layout/MainLayout/Sidebar/MenuList/NavCollapse';

import { MenuGroupType } from "@/menu/menuType";

const NavGroup = ({ item }:{item:MenuGroupType}) => {
    const theme = useTheme();

    // menu list collapse & items
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                subheader={
                    item.title && (
                        //@ts-ignore
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            {item.title}
                            {item.caption && (
                                //@ts-ignore
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};


export default NavGroup;
