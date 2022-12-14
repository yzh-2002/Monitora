// 封装接口调用代码
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, Method} from "axios";


//TODO: 错误消息提示
export class request{
    private instance:AxiosInstance; //axios实例
    private setLoading;
    constructor(config:AxiosRequestConfig,setLoading:(loading:boolean)=>void){
        this.instance =axios.create(config)
        this.setLoading =setLoading;
        // 拦截器设置（主要设置一下过渡动画）
        this.interceptors();
    }
    private interceptors(){
        //发送请求前的拦截处理
        this.instance.interceptors.request.use((config:AxiosRequestConfig)=>{
            //过渡动画
            this.setLoading(true);
            return config;
        },err=>{
            err.data ={};
            err.data.msg ="请求发送异常！！"
            return err;
        })
        //接收返回值后的拦截处理
        this.instance.interceptors.response.use((res:AxiosResponse)=>{
            //结束动画
           this.setLoading(false);
            return res;
        },err=>{
            // ElMessage.error(err.data.msg || "服务器出错！！");
            return err;
        })
    }

    // 简单封装一下get方法
    get(url:string){
        return new Promise((resolve,reject)=> {
            this.instance.get(url).then(res=>{
                resolve(res.data.data)
            }).catch(err=>{
                reject(err);
            })
        })
    }
}
