import React,{Component} from "react";
import axios             from "axios";

import Secrch            from "./hSubassembly/secrch.js"
import Hlis              from "./hSubassembly/hLis.js"
import Page              from "./public/Pagination.js"
import "../css/h.css"

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
        let _data;
        if(data){
            _data = data;
        }else{
            _data={
                numberPage:5,
                page:1
            }
        }
        axios.post(this.props.http+"/securitylock/web/admin/getOrderList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                     this.setState({
                        strip:res.data.data.strip,
                        Lis:res.data.data.order
                     })
                 }
                 cb&&cb()
             })
    }

    SalesStatistics=(obj,cb)=>{
       console.log(obj)
       cb&&cb()
    }
    //-----翻页数据------\\
    pageTo=(data)=>{
        console.log(data)
    }

    render(){
        return(
            <div className={"a g h"}>
                <h3><span><i className={"iconfont icon-dingdan"}></i>订单</span></h3>
                <Secrch getSalesStatistics={this.SalesStatistics} http={this.props.http}/>
                <Hlis Lis={this.state.Lis} http={this.props.http}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
