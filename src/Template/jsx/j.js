import React,{Component} from "react";
import axios             from "axios";
import "../css/j.css"

import Secrch            from "./jSubassembly/secrch.js"
import Jlis              from "./jSubassembly/jLis.js"
import Page              from "./public/Pagination.js"  

export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            page:"",
            Lis:[],
            strip:0,
            provinces:"",
            state:"",
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
     //-----搜索数据------\\
    SalesStatistics=(obj,cb)=>{
        this.setState({
            provinces:obj.provinces,
            state:    obj.state,
        })
        this.init(obj,()=>{
            cb&&cb()
        })
    }
    //-----翻页数据------\\
    pagingAdmin=(data)=>{
        this.setState({
            page:data
        })
        this.init({page:data})
    }
    //----提交维修信息---\\
    _diff=(data,cb)=>{
        let _this = this;
        axios.post(this.props.http+"/securitylock/web/admin/updateMaintenance",data)
             .then((res)=>{
                 if(res.data.code===1000){
                    _this.init({
                        page:this.state.page,
                   provinces:this.state.provinces,
                       state:this.state.state,
                        })
                 }else{
                     alert(res.data.message)
                 }
                 cb&&cb()
             })
    }
    render(){
        return(
            <div className={"a g h i j"}>
                <h3><span><i className={"iconfont icon-huobiqiandaizijin"}></i>返利</span></h3>
                <Secrch getSalesStatistics={this.SalesStatistics} http={this.props.http}/>
                <Jlis _diff={this._diff} Lis={this.state.Lis} http={this.props.http}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
