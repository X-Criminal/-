import React,{Component}        from "react";
import {Input,Button}           from "antd" ;
//import axios                    from "axios";

import Transition from "../public/transition.js"
export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
         sid:"",
         data:{},
        }
    }
    componentDidMount(){
        console.log(this.props.diffData)
       //门店详情没有接口
    }
    
    render(){
            return(
                <div className={"Addinfo"}>
                    <div className={"AddinfoBox"}>  
                        <h4>修改  <i className={"deladmin"} onClick={this.props._onclick}></i></h4>
                        <div><span>账号</span> <Input name={"accounts"} onChange={this.props._onchange} placeholder={this.props.diffData.accounts}/></div>
                        <div><span>密码</span> <Input name={"password"} onChange={this.props._onchange} placeholder={this.props.diffData.password}/></div>
                        <div><span>店面名称</span> <Input name={"storeName"} onChange={this.props._onchange} placeholder={this.props.diffData.storeName}/></div>
                        <div><span>联系人</span> <Input name={"contacts"} onChange={this.props._onchange} placeholder={this.props.diffData.contacts}/></div>
                        <div><span>联系方式</span> <Input name={"phone"} onChange={this.props._onchange} placeholder={this.props.diffData.phone}/></div>
                        <div><span>省市区</span> <Transition name={"provinces"} xz={true} xzInfo={this.props._onchange} placeholder={this.props.diffData.provinces}/></div>
                        <div><span>街道</span> <Input name={"street"} onChange={this.props._onchange} placeholder={this.props.diffData.street}/></div>
                        <div><span>详细地址</span> <Input name={"detailsAddress"} onChange={this.props._onchange} placeholder={this.props.diffData.detailsAddress}/></div>
                        <div><span>区域管理员</span> <Input name={"sid"} disabled={true} placeholder={this.props.diffData.adminName} value={this.props.diffData.adminName}/></div>
                        <div className={"AddinfoEnd"}><Button onClick={this.props._onclick}>取消</Button><Button onClick={this.props.updata.bind(this,this.props.diffData.sid)}>确定</Button></div>
                    </div>
                </div>
            )
    }
}