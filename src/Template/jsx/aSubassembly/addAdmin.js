import React,{Component} from "react";
import {Button,Input} from "antd"

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
                isAdd:false,
                accounts:"",
                password:"",
                name:"",
                phone:"",
        }
    }

    enterIconLoading=()=>{
        this.setState({
            isAdd:!this.state.isAdd,
        })
    }

    UpAdmin=( )=>{
        let data={
            accounts:this.state.accounts,
            password:this.state.password,
            name:this.state.name,
            phone:this.state.phone,
            type:2
        }
            this.props.upAdmin(data,()=>{
                this.setState({
                    isAdd:!this.state.isAdd
                })
            })
    }
    /***
     * 
     * 收集用户输入数据
     */
    _change=(e)=>{
           this.setState({
               [e.target.name]:e.target.value,
           })
    }
        render(){
        return(
            <div>
                <Button className={"addAdmin"} type="primary" icon="plus" onClick={this.enterIconLoading}>
                    添加
                </Button>
                <Addadmin upAdmin={this.UpAdmin} change={this._change} _onclick={this.enterIconLoading} isAdd={this.state.isAdd}/>
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
                    <div><span>账号</span> <Input onChange={props.change} name={"accounts"}/></div>
                    <div><span>密码</span> <Input onChange={props.change} name={"password"}/></div>
                    <div><span>姓名</span> <Input onChange={props.change} name={"name"}/></div>
                    <div><span>联系方式</span> <Input onChange={props.change} name={"phone"}/></div>
                    <div className={"AddinfoEnd"}><Button onClick={props._onclick}>取消</Button><Button onClick={props.upAdmin}>确定</Button></div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}