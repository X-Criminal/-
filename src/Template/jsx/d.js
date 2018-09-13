import React,{Component} from "react";
import axios             from "axios";
import cookie            from "react-cookies";

import Search     from "./public/search.js";
import Transition from "./public/transition.js";
import Page       from "./public/Pagination.js"
import Dlis       from "./dSubassembly/aLis.js"

import "../css/d.css"

export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            lisData:[],
            condition:"",
            page:1,
        }
    }
    componentDidMount(){//生命周期
       this.init()
    }

    /**
     * 初始化数据
     * ——————————
     */
    init=(data,cb)=>{
        let _data;
        if(data){
            _data = data;
        }else{
            _data={
                numberPage:5,
                page:1,  
            }
        }
        axios.post(this.props.http+"/securitylock/web/user/getUserList",_data)
            .then((res)=>{
                if(res.data.code===1000){
                    this.setState({
                        lisData:res.data.data.user,
                        strip:res.data.data.strip,
                    })
                }else{
                    alert(res.data.message)
                }
                cb&&cb()
            })
    }

    /*
     * 搜索返回内容
     * __________________
     */
    ontranstion=(data,cb)=>{
        this.setState({
            condition:data,
        })
        this.init({
                    condition:data,
                    numberPage:5,
                    page:1,  
        },()=>{
            cb&&cb()
        })
    }

    /**
     * 翻页
     * ————————
     */
    pagingAdmin=(e)=>{
        this.setState({
            res:e
        })
        this.init({
            condition:this.state.condition,
            numberPage:5,
            page:e
        })
    };
    /***
     * ~~~~~~~~~~~~
     * 删除返回
     * ___________
    */
   dele=(data,cb)=>{
        axios(this.props.http+"/securitylock/web/admin/deleteStoreById?sid="+data)
            .then((res)=>{
                this.init({numberPage:5,page:this.state.page,condition:this.state.condition})
                alert(res.data.message);
                cb&&cb();
            })
    }


    render(){
        return(
            <div className={"a d"}>
                <h3><span><i className={"iconfont icon-usergroup"}> </i> App用户</span></h3>
                <div className={"clear-fix"}>
                {
                    cookie.load("adminInfo").data.type==="3"?
                        <Search getSearchData={this.ontranstion}/>
                        :
                        <Transition ontranstion={this.ontranstion}/>
                }
                </div>
                <Dlis lisData={this.state.lisData} dele={this.dele} http={this.props.http}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
