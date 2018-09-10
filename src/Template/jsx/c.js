import React,{Component} from "react";
import axios             from "axios";

import Transition from "./public/transition.js";
import Cadd       from "./cSubassembly/addAdmin.js";
import Clis       from "./cSubassembly/aLis.js"
import Page       from "./public/Pagination.js";

export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            strip:11,
            lisData:[],
            page:1,
            condition:"",
        }
    }

    componentDidMount(){//生命周期
        this.init()
    }

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
        axios.post(this.props.http+"/securitylock/web/admin/getStoreList",_data)
            .then((res)=>{
                if(res.data.code===1000){
                    this.setState({
                        lisData:res.data.data.store,
                        strip:res.data.data.strip,
                    })
                }else{
                    alert(res.data.message)
                }
                cb&&cb()
            })
    }
    addData=(data,cb)=>{
        let _this = this;
        data.aid = (+data.aid)
        axios.post(this.props.http+"/securitylock/web/admin/insertTypeAdmin",data)
        .then((res)=>{
            if(res.data.code===1000){
                _this.init( )
            }
            alert(res.data.message)
            cb&&cb()
        }).catch((res)=>{
            cb&&cb()
            console.log(res)
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
        this.setState({          
            condition:data,
        })
        this.init({
            numberPage:5,
            page:1,
            condition:data,
        },()=>{
            cb&&cb()
        })
        console.log(data)
    }
    /**
     * 
     * 点击添加
     */
    updata=(data,cb)=>{
            this.addData(data,()=>{
                cb&&cb()
            })   
    }
    /***
     * 
     * 点击修改
     */
    diff=(data,cb)=>{
        axios.post(this.props.http+"/securitylock/web/admin/updateStore",data)
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
        axios(this.props.http+"/securitylock/web/admin/deleteStoreById?id="+data)
            .then((res)=>{
                    alert(res.data.message)
                    _this.init()
            })
    }
    render(){
        return(
            <div className={"a c"}>
                 <h3><span><i className={"iconfont icon-dianpu"}> </i> 店面管理</span></h3>
                 <div>
                    <Transition ontranstion={this.ontranstion}/>
                    <Cadd updata={this.updata}/>
                </div>
                <Clis lisData={this.state.lisData} diff={this.diff} dele={this.dele}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
