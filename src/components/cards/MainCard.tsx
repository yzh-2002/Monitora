import {forwardRef, ReactElement} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

interface PropTypes {
    border?:boolean,
    boxShadow?:boolean,
    children?:ReactElement | null,
    content?:boolean,
    contentClass?:string,
    contentSX?:object,
    darkTitle?:boolean,
    // secondary?:ReactElement | string | object,
    shadow?:string,
    sx?:object,
    title?:string | ReactElement | object
}

const MainCard =forwardRef(({border = true, boxShadow, children, content = true, contentClass = '',
                                contentSX = {}, darkTitle, shadow, sx = {}, title,
                                ...others}:PropTypes,ref)=>{
    const theme =useTheme();
    return (
        //@ts-ignore
        <Card ref={ref}
              {...others}
            sx={{
                border: border ? '1px solid' : 'none',
                //@ts-ignore
                borderColor: theme.palette.primary[200] + 75,
                ':hover': {
                    boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                },
                ...sx
            }}
        >
            {/* card header and action */}
            {/*@ts-ignore*/}
            {!darkTitle && title && <CardHeader sx={headerSX} title={title} />}
            {darkTitle && title && (
                //@ts-ignore
                <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} />
            )}

            {/* content & header divider */}
            {title && <Divider />}

            {/* card content */}
            {content && (
                <CardContent sx={contentSX} className={contentClass}>
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    );
})

export default MainCard;