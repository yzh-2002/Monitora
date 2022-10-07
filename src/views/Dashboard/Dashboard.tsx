import { Box, Container, Grid } from '@mui/material';
import { IconAccessPoint } from "@tabler/icons";

import MyCard from "@/views/Dashboard/Card";
import FlowLineChart from "@/views/Dashboard/Charts/FlowLineChart";
import FlowFanChart from "@/views/Dashboard/Charts/FlowFanChart";
// 展示数据
const SysData ={
    "NETWORK":{
        name:"network",
        num:3,
        icon:IconAccessPoint
    },
    "CAMERA":{
        name:"network",
        num:3,
        icon:IconAccessPoint
    },
    "SWITCH":{
        name:"network",
        num:3,
        icon:IconAccessPoint
    },
    "SERVER":{
        name:"network",
        num:3,
        icon:IconAccessPoint
    }
}

function Dashboard(){

    return (
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <MyCard {...SysData["NETWORK"]}/>
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            <MyCard {...SysData["NETWORK"]}/>
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            <MyCard {...SysData["NETWORK"]}/>
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            <MyCard {...SysData["NETWORK"]}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <FlowLineChart></FlowLineChart>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <FlowFanChart></FlowFanChart>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
    )
}

export default Dashboard;