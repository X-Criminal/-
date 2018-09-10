import React,{Component} from "react";
import {Button,Input} from "antd"

import Transition from "../public/transition.js"

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
                isAdd:false,
                accounts:"",
                password:"",
                name:"",
                phone:"",
                provinces:"",
                street:"",
                detailsAddress:"",
        }
    }

    enterIconLoading=()=>{
        this.setState({
            isAdd:!this.state.isAdd,
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
    updata=()=>{
        let data={
            accounts:this.state.accounts,
            password:this.state.password,
            name:this.state.name,
            phone:this.state.phone,
            provinces:this.state.provinces,
            street:this.state.street,
            detailsAddress:this.state.detailsAddress,
        }
        this.props.updata(data,()=>{
            this.setState({
                isAdd:!this.state.isAdd,
            })
        })
    }
        render(){
        return(
            <div>
                <Button className={"addAdmin"} type="primary" icon="plus" onClick={this.enterIconLoading}>
                    添加
                </Button>
                <Addadmin updata={this.updata} _onchange={this._onchange} _onclick={this.enterIconLoading} isAdd={this.state.isAdd}/>
            </div>
        )
    }
}
function Addadmin(props){
    if(props.isAdd){
        return(
            <div className={"Addinfo"}>
                <div className={"AddinfoBox"}>
                    <h4>添加  <i className={"deladmin"} onClick={props._onclick}></i></h4>
                    <div><span>账号</span> <Input name={"accounts"} onChange={props._onchange}/></div>
                    <div><span>密码</span> <Input name={"password"} onChange={props._onchange}/></div>
                    <div><span>姓名</span> <Input name={"name"} onChange={props._onchange}/></div>
                    <div><span>联系方式</span> <Input name={"phone"} onChange={props._onchange}/></div>
                    <div><span>省市区</span> <Transition name={"provinces"} xz={true} xzInfo={props._onchange}/></div>
                    <div><span>街道</span> <Input name={"street"} onChange={props._onchange}/></div>
                    <div><span>详细地址</span> <Input name={"detailsAddress"} onChange={props._onchange}/></div>
                    <div className={"AddinfoEnd"}><Button onClick={props._onclick}>取消</Button><Button onClick={props.updata}>确定</Button></div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}