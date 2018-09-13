import React,{Component} from "react";
import axios             from "axios";

import Search   from "./public/search.js";
import AddAdmin from "./aSubassembly/addAdmin.js";
import Alis     from "./aSubassembly/aLis.js";
import Page     from "./public/Pagination.js"
import "../css/a.css";

export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            numPage:0,//总页数
            strip:0, //总条数
            numberPage:5,
            keywords:"",
            Lis:[],
        }
    }
    componentDidMount(){
        this.init()
    }
    init=(data,cb)=>{
        let _data=null;
            if(data){
                _data=data;
            }else{
                _data={
                    numberPage:this.state.numberPage,
                    page:1,
                    type:2
                }
            }
        axios.post(this.props.http+"/securitylock/web/admin/getAdminList",_data)
        .then((res)=>{
            if(res.data.code===1000){
                this.setState({
                    Lis:res.data.data.admin,
                    numberPage:res.data.data.numberPage,
                    strip:res.data.data.strip
                })
               
            }else{
                alert(res.data.message)
            }
            cb&&cb()
        })
    }
/**
 * 
 * 搜索管理员
 */
    SearchAdmin=(data,cb)=>{
        let _data ={
            numberPage:this.state.numberPage,
            keywords:data,
            page:1,
            type:2,
        }
        this.setState({
            keywords:data
        })
        this.init(_data,()=>{
            cb&&cb();
        })
    }
/**
 * 
 * 添加管理员
 */
    upAdmin=( data,cb )=>{
        let _this = this;
        data.type=2;
        axios.post(this.props.http+"/securitylock/web/admin/insertTypeAdmin",data)
        .then((res)=>{
                    alert(res.data.message);
                    _this.init( );
                    cb&&cb();
        })
      
    }
 /***
  * 
  * 修改管理员
  */
    _diff=(data,cb)=>{
        console.log("修改数据",data);
        axios.post(this.props.http+"/securitylock/web/admin/updateAdmin",data)
            .then((res)=>{
                alert(res.data.message)
                cb&&cb();
            })
    }
/**
 * 
 * 删除管理员
 */
    deleAdmin=(data,cb)=>{
        console.log("删除数据",data)
        axios.get(this.props.http+"/securitylock/web/admin/deleteTypeAdmin?aid="+data)
             .then((res)=>{
                 if(res.data.code===1000){
                    this.init()
                 }
                 alert(res.data.message)
                 cb&&cb()
             })
    }
/***
* 
* 管理员翻页
*/
    pagingAdmin=(data)=>{
        let _data;
            _data = {
                numberPage:this.state.numberPage,
                page: data,
                keywords:this.state.keywords,
                type:2
            };
        this.init(_data);
    }
    render(){
        return(
            <div className={"a"}>
                <h3><span><i className={"iconfont icon-yonghu"}></i>管理员设置 </span><span>/ 普通管理员</span></h3>
                <div><Search getSearchData={this.SearchAdmin}/><AddAdmin upAdmin={this.upAdmin}/></div>
                <Alis Lis={this.state.Lis} _diff={this._diff} deleAdmin={this.deleAdmin}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
