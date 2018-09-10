import React,{Component} from "react";
import axios             from "axios";

import Secrch            from "./jSubassembly/secrch.js"
import Ilis              from "./jSubassembly/jLis.js"
import Page              from "./public/Pagination.js"
import "../css/i.css"

export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            Lis:[],
            strip:0,
        }
    }
    componentDidMount(){
        this.init()
    }

    init(data,cb){
        let _data={
                numberPage:5,
                page:1,
                state:"",
            }
            for(let k in data){
                _data[k]=data[k]
            }
    
        axios.post(this.props.http+"/securitylock/web/admin/getMaintenanceList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                     this.setState({
                        strip:res.data.data.strip,
                        Lis:res.data.data.repair
                     })
                 }
                 cb&&cb()
             })
    }

    SalesStatistics=(obj,cb)=>{
        this.init(obj,()=>{
            cb&&cb()
        })
    }
    //-----翻页数据------\\
    pageTo=(data)=>{
        this.init({page:data})
    }

    render(){
        return(
            <div className={"a g h i"}>
                <h3><span><i className={"iconfont icon-huobiqiandaizijin"}></i>返利</span></h3>
                <Secrch getSalesStatistics={this.SalesStatistics} http={this.props.http}/>
                <Ilis Lis={this.state.Lis} http={this.props.http}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
