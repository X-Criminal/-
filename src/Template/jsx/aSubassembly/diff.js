import React,{Component} from "react";
import {Input,Button}           from "antd" 

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            accounts:"",
            password:"",
            name:"",
            phone:""
        }
    }
    change=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    postData=( )=>{
        let data={
            accounts:this.state.accounts,
            password:this.state.password,
            name:this.state.name,
            phone:this.state.phone,
            aid:this.props.diff.aid,
        }
        this.props._diff( data,()=>{
            this.props._onclick( )
        } )
    }
    
    render(){
        if(this.props._diffBox){
            return(
                <div className={"Addinfo"}>
                <div className={"AddinfoBox"}>
                    <h4>添加  <i className={"deladmin"} onClick={this.props._onclick}></i></h4>
                    <div><span>账号</span> <Input onChange={this.change} name={"accounts"} placeholder={this.props.diff.accounts}/></div>
                    <div><span>密码</span> <Input onChange={this.change} name={"password"} placeholder={this.props.diff.password}/></div>
                    <div><span>姓名</span> <Input onChange={this.change} name={"name"} placeholder={this.props.diff.name}/></div>
                    <div><span>联系方式</span> <Input onChange={this.change} name={"phone"} placeholder={this.props.diff.phone}/></div>
                    <div className={"AddinfoEnd"}><Button onClick={this.props._onclick}>取消</Button><Button onClick={this.postData}>确定</Button></div>
                </div>
            </div>
            )
        }else{
            return null;
        }
    }
} 