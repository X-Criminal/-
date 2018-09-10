import React,{Component} from "react";
import axios             from "axios";

import Transition from "./public/transition.js";
import Badd       from "./bSubassembly/addAdmin.js";
import Blis       from "./bSubassembly/aLis.js";
import Page     from "./public/Pagination.js"

import "../css/b.css";
export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            strip:11,
            lisData:[],
            condition:"",
            page:1,
        }
    }
    componentDidMount(){
        this.init()
    }

    init=(data,cb)=>{
            let _data;
            if(!data){
                _data={
                    type:3,
                    numberPage:5,
                    page:1,
                }
            }else{
                _data=data;
                _data.type=3;
            }
            axios.post(this.props.http+"/securitylock/web/admin/getAdminList",_data)
                .then((res)=>{
                    if(res.data.code===1000){
                        this.setState({
                            lisData:res.data.data.admin,
                            strip:res.data.data.strip,
                        })
                    }else{
                        alert(res.data.message)
                    }
                    cb&&cb()
                }).catch(()=>{
                    alert("网络错误请稍后再试！")
                })
    }
    addData=(data,cb)=>{
        let _this = this;
        data.type=3;
        axios.post(this.props.http+"/securitylock/web/admin/insertTypeAdmin",data)
        .then((res)=>{
            if(res.data.code===1000){
                _this.init( )
            }
            alert(res.data.message)
            cb&&cb()
        }).catch(()=>{
            alert("网络错误请稍后再试！")
        })

    }
    /***
     * 翻页数据
     */
     pagingAdmin=(data)=>{
            this.setState({
                page:data
            })
            let _data= {
                numberPage:5,
                condition:this.state.condition,
                page:data
            }
            this.init(_data)
    }
    /**
     * 点击搜索
     */
    ontranstion=(data,cb)=>{
        let _data={
            numberPage:5,
            page:1,
            condition:data,
        }
        this.init(_data,()=>{
            cb&&cb()
        })
        console.log(data)
    }
    /**
     * 
     * 点击添加
     */
    updata=(data,cb)=>{
            console.log(data)
            this.addData(data,()=>{
                cb&&cb()
            })
            
    }
    /***
     * 
     * 点击修改
     */
    diff=(data,cb)=>{
        axios.post(this.props.http+"/securitylock/web/admin/updateAdmin",data)
             .then((res)=>{
                alert(res.data.message)
                cb&&cb()
                 this.init({
                    condition:this.state.condition,
                    numberPage:5,
                    type:3,
                    page:this.state.page,
                 })
             }) 
    }
    /**
     * 
     * 点击删除
     */
    dele=(data,cb)=>{
       let _this = this;
        cb&&cb()
        axios(this.props.http+"/securitylock/web/admin/deleteTypeAdmin?aid="+data)
             .then((res)=>{
                     alert(res.data.message)
                     _this.init()
             })
    }
    render(){
        return(
            <div className={"a b"}>
                <h3><span><i className={"iconfont icon-yonghu"}></i>管理员设置 </span><span>/ 普通管理员</span></h3>
                <div>
                    <Transition ontranstion={this.ontranstion}/>
                    <Badd updata={this.updata} />
                </div>
                <Blis lisData={this.state.lisData} diff={this.diff} dele={this.dele}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
