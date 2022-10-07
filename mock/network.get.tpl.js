const range =require('loadsh/range')

const cameraLink =range(4).map(i=>({
    id:"link-camera-"+i,
    source:"camera-"+i,
    target:"switch-"+i,
    meta:{
        payload:Math.random()*(100-30)+30
    }
}))
const computerLink =range(3).map(i=>({
    id:'link-computer-'+i,
    source:"computer-"+i,
    target:"switch-"+(9-i),
    meta:{
        payload:Math.random()*(200-100)+100
    }
}))
const serverLink =range(2).map(i=>({
    id:"link-server-"+i,
    source:"server-"+i,
    target:"switch-"+(9-i-3),
    meta:{
        payload:Math.random()*(300-150)+150
    }
}))

module.exports =()=>{
    const res={
        data:{
            network:{
                computer:[
                    {
                        id:"computer-0",
                        label:"主监控室",
                        comboId:"computer"
                    },
                    {
                        id:"computer-1",
                        label:"副监控室01",
                        comboId:"computer"
                    },
                    {
                        id:"computer-2",
                        label:"副监控室02",
                        comboId:"computer"
                    }
                ],
                switch:range(10).map(i=>({
                    id:'switch-'+i,
                    label:"switch-"+i,
                    comboId:"switch"
                })),
                camera:[
                    {
                        id:"camera-0",
                        label:"华鑫科技园区",
                        comboId:"camera"
                    },
                    {
                        id:"camera-1",
                        label:"界宏企业园区",
                        comboId:"camera"
                    },
                    {
                        id:"camera-2",
                        label:"云轮科创园区",
                        comboId:"camera"
                    },
                    {
                        id:"camera-3",
                        label:"台积电产业园区",
                        comboId:"camera"
                    },
                ],
                server:[
                    {
                        id:"server-0",
                        label:"主服务器",
                        comboId:"server"
                    },
                    {
                        id:"server-1",
                        label:"备用服务器",
                        comboId:"server"
                    }
                ],
                links:[
                    // camera与switch
                    ...cameraLink,
                    // computer与switch
                    ...computerLink,
                    // server与switch
                    ...serverLink,
                    // switch与switch
                    {
                        id:"link-switch-00",
                        source:"switch-0",
                        target:"switch-1",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-01",
                        source:"switch-0",
                        target:"switch-6",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-02",
                        source:"switch-1",
                        target:"switch-2",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-03",
                        source:"switch-1",
                        target:"switch-4",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-04",
                        source:"switch-1",
                        target:"switch-3",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-05",
                        source:"switch-2",
                        target:"switch-8",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-06",
                        source:"switch-4",
                        target:"switch-8",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-07",
                        source:"switch-3",
                        target:"switch-4",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-08",
                        source:"switch-3",
                        target:"switch-5",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-09",
                        source:"switch-5",
                        target:"switch-6",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-10",
                        source:"switch-6",
                        target:"switch-8",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-11",
                        source:"switch-8",
                        target:"switch-9",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                    {
                        id:"link-switch-12",
                        source:"switch-8",
                        target:"switch-7",
                        meta:{
                            payload:Math.random()*(100-30)+30
                        }
                    },
                ],
                combos:[
                    {
                        id:"computer",
                        type:"rect",
                        label:"computer",
                        fixSize:[200,75]
                    },
                    {
                        id:"camera",
                        type:"rect",
                        label:"camera",
                        fixSize:[75,250]
                    },
                    {
                        id:"server",
                        type:"rect",
                        label:"server",
                        fixSize:[150,75]
                    },
                    {
                        id:"switch",
                        type:"circle",
                        label:"switch",
                        fixSize:200
                    }

                ]
            }
        }
    }
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(res)
        },1*1000) //构造网络延迟
    })
}