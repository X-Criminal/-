import React,{Component} from "react";
import {Input,Button}    from "antd" 
import axios            from "axios";

import Transition from "../public/transition.js"
export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{},
            accounts:"",
            password:"",
            name:"",
            phone:"",
            provinces:"",
            street:"",
            detailsAddress:"",
            aid:" "
        }
    }

    componentDidMount(){
        axios.get(this.props.http+"/securitylock/web/admin/getAdminDetails?aid="+this.props.diffData.aid)
             .then((res)=>{
                    this.setState({
                        data:res.data.data,
                         aid:this.props.diffData.aid
                    })
             })
    }
    _onchange=(e)=>{
        if(e.target){
            this.setState({
                [e.target.name]:e.target.value,
            })
        }else{
            this.setState({
                provinces:""+e[0]+e[1]+e[2]
            })
        }
    }

    render(){
            return(
                <div className={"Addinfo"}>
                    <div className={"AddinfoBox"}>
                        <h4>添加  <i className={"deladmin"} onClick={this.props._onclick}></i></h4>
                        <div><span>账号</span> <Input name={"accounts"} onChange={this._onchange} placeholder={this.state.data.accounts}/></div>
                        <div><span>密码</span> <Input name={"password"} onChange={this._onchange} placeholder={this.state.data.password}/></div>
                        <div><span>姓名</span> <Input name={"name"} onChange={this._onchange} placeholder={this.state.data.name}/></div>
                        <div><span>联系方式</span> <Input name={"phone"} onChange={this._onchange} placeholder={this.state.data.phone}/></div>
                        <div><span>省市区</span> <Transition name={"provinces"} xz={true} xzInfo={this._onchange} placeholder={this.state.data.provinces}/></div>
                        <div><span>街道</span> <Input name={"street"} onChange={this._onchange} placeholder={this.state.data.street}/></div>
                        <div><span>详细地址</span> <Input name={"detailsAddress"} onChange={this._onchange} placeholder={this.state.data.detailsAddress}/></div>
                        <div className={"AddinfoEnd"}><Button onClick={this.props._onclick}>取消</Button><Button onClick={this.props.updata.bind(this,{
                                                                                                                          accounts:this.state.accounts,
                                                                                                                          password:this.state.password,
                                                                                                                              name:this.state.name,
                                                                                                                             phone:this.state.phone,
                                                                                                                         provinces:this.state.provinces,
                                                                                                                            street:this.state.street,
                                                                                                                    detailsAddress:this.state.detailsAddress,
                                                                                                                               aid:this.state.aid
                                                                                                                         })}>确定</Button></div>
                    </div>
                </div>
            )
    }
} 