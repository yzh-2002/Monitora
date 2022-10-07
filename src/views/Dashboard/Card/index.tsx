import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { TablerIcon } from "@tabler/icons";


interface MyCardType {
    name:string,
    num:number,
    icon:TablerIcon
}

const MyCard =({name,num,icon}:MyCardType)=>{
    const Icon =icon
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            {name}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {num}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                height: 56,
                                width: 56
                            }}
                        >
                            <Icon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        )
};

export default MyCard;