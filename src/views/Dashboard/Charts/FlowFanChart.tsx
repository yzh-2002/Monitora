import {Box, Card, CardContent, CardHeader, Divider, Typography} from "@mui/material";

import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

import {FanChartData, LineChartData} from "@/views/Dashboard/Charts/fakeData";
import {useEffect} from "react";

const FlowFanChart =()=>{
    useEffect(()=>{
        const newSupportChart = {
            ...LineChartData.options,
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    },[])

    return (
        <Card>
            <CardHeader title="Flow by Network" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    {/*@ts-ignore*/}
                    <Chart {...FanChartData}></Chart>
                </Box>
            </CardContent>
        </Card>
    )
}

export default FlowFanChart;