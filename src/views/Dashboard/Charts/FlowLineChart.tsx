import { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from '@mui/material';

import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

import {LineChartData} from "@/views/Dashboard/Charts/fakeData";

const FlowLineChart =()=>{
    const theme =useTheme();
    //@ts-ignore
    const orangeDark =theme.palette.secondary[800];

    useEffect(()=>{
        const newSupportChart = {
            ...LineChartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    },[orangeDark,])

    return (
        <Card>
            <CardHeader
                title="Network Flows"
            />
            <Divider/>
            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                   {/* @ts-ignore*/}
                   <Chart {...LineChartData} ></Chart>
                </Box>
            </CardContent>
        </Card>
    );
}

export default FlowLineChart