import React,{Component} from "react";
import {Input,Button}           from "antd" 

import Transition from "../public/transition.js"
export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
         
        }
    }

    
    render(){
        if(this.props._diffBox){
            return(
                <div className={"Addinfo"}>
                    <div className={"AddinfoBox"}>
                        <h4>添加  <i className={"deladmin"} onClick={this.props._onclick}></i></h4>
                        <div><span>账号</span> <Input name={"accounts"} onChange={this.props._onchange} placeholder={this.props.diffData.accounts}/></div>
                        <div><span>密码</span> <Input name={"password"} onChange={this.props._onchange} placeholder={this.props.diffData.password}/></div>
                        <div><span>姓名</span> <Input name={"name"} onChange={this.props._onchange} placeholder={this.props.diffData.name}/></div>
                        <div><span>联系方式</span> <Input name={"phone"} onChange={this.props._onchange} placeholder={this.props.diffData.phone}/></div>
                        <div><span>省市区</span> <Transition name={"provinces"} xz={true} xzInfo={this.props._onchange} placeholder={this.props.diffData.provinces}/></div>
                        <div><span>街道</span> <Input name={"street"} onChange={this.props._onchange} placeholder={this.props.diffData.street}/></div>
                        <div><span>详细地址</span> <Input name={"detailsAddress"} onChange={this.props._onchange} placeholder={this.props.diffData.detailsAddress}/></div>
                        <div className={"AddinfoEnd"}><Button onClick={this.props._onclick}>取消</Button><Button onClick={this.props.updata.bind(this,this.props.diffData.aid)}>确定</Button></div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }
} 