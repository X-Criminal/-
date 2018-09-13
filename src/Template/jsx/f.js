import React,{Component} from "react";
import axios             from "axios";
import cookie            from "react-cookies";

import Search     from "./public/search.js";
import Transition from "./public/transition.js";
import Page       from "./public/Pagination.js";
import Flis       from "./fSubassembly/fLis.js"
import "../css/f.css"
export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            strip:0,
            condition:"",
            lis:[],
        }
    }

    componentDidMount(){
        this.init()
    }

    init( data,cb ){
        let _data={
            numberPage:5,
            page:1,
            condition:"",
        }
        for(let k in data){
            _data[k]=data[k]
        }

        axios.post(this.props.http+"/securitylock/web/admin/getDeviceList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                        this.setState({
                            lis:res.data.data.device,
                            strip:res.data.data.strip
                        })
                 }else{
                     alert(res.data.message)
                 }
                 cb&&cb()
             })
    }
    /**翻页*/
    pagingAdmin=(data)=>{
        this.init({
            numberPage:5,
            page:data
        })
    }
    /**搜索数据 */
    ontranstion=(data,cb)=>{
       this.setState({
            condition:data.includes("undefined")?"":data,
       })
       this.init({condition:data.includes("undefined")?"":data},()=>{
        cb&&cb()
       })
    }
    render(){
        return(
            <div className={"a f"}> 
                <h3><span><i className={"iconfont icon-shezhi"}></i> 设备管理</span></h3>
                <div className={"clear-fix"}>
                    {
                        cookie.load("adminInfo").data.type==="3"?
                            <Search getSearchData={this.ontranstion}/>
                        :    
                            <Transition ontranstion={this.ontranstion}/>
                    }
                </div>
                  <Flis lis={this.state.lis} http={this.props.http}/>
                <div>
                    <div className={"Identification"}>
                        设备状态 ：<span className={"ico _z"}>正常</span><span className=" ico _y">异常</span><span className={"ico _q"}>欠费</span><span className={"ico __b"}>报警</span>
                    </div>
                    <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
                </div>
            </div>
        )
    }
}
