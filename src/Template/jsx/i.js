import React,{Component} from "react";
import axios             from "axios";
import cookie            from "react-cookies";

import Type3             from "./iSubassembly/Ypre3.js"
import Secrch            from "./iSubassembly/secrch.js"
import Ilis              from "./iSubassembly/iLis.js"
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
                aid:"",
                numberPage:5,
                page:1,
                provinces:"",
                rebateDateYear:"",
                state:"",
            }
            for(let k in data){
                _data[k]=data[k]
            }
    
        axios.post(this.props.http+"/securitylock/web/admin/getRebateList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                     this.setState({
                        strip:res.data.data.strip,
                        Lis:res.data.data.rebate
                     })
                 }else{
                    alert(res.data.message)
                 }
                 
                 cb&&cb()
             })
    }

    SalesStatistics=(obj,cb)=>{
        console.log(obj)
        this.init(obj,()=>{
            cb&&cb()
        })
    }
    //-----翻页数据------\\
    pageTo=(data)=>{
        this.init({page:data})
    }
    //-------审核返利--------\\
    _diff=(data,cb)=>{
        axios.post(this.props.http+"/securitylock/web/admin/updateRebate",data)
             .then((res)=>{
                    alert(res.data.message)
                    cb&&cb()
            })
    }

    render(){
        return(
            <div className={"a g h i"}>
                <h3><span><i className={"iconfont icon-huobiqiandaizijin"}></i>返利</span></h3>
                {
                    cookie.load("adminInfo").data.type!=="3"?
                    <Secrch getSalesStatistics={this.SalesStatistics} http={this.props.http}/>
                    :
                    <Type3 http={this.props.http}/>
                }
                <Ilis  Lis={this.state.Lis} http={this.props.http} _diff={this._diff}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
