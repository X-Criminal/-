import React from "react";
import axios from "axios";
import {Input,Button } from "antd";
import "./css/login.css";

//普通管理员账号 "zhangsan"  ddd

export default class login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            err:"",
            accounts:"",
            password:"",
        }
    }
    /**
     * 点击状态
     */
    enterLoading=()=>{
        this.setState({
            loading:true,
        })
        this.Axios()
    }
    /***
     * 保存输入数据
     */
    _onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    /**
     * 清除错误提示
     */
    _focus=()=>{
       this.setState({
           err:"",
       })
    }
    /**
     * 发送请求
     */
    Axios=()=>{
        let data ={
            accounts:this.state.accounts,
            password:this.state.password
        },
        _this=this;
        axios.post(this.props.http+"/securitylock/web/admin/Login",data)
        .then((res)=>{
            if(res.data.code===1000){
                res.data.data.password=this.state.password;
                _this.props._onclick(res.data)
            }else{
                this.setState({
                    err:res.data.message,
                    loading:false,
                })
            }
        }).catch((res)=>{
            this.setState({
                loading:false
            })
            alert("网络错误，请稍后再试！")
        })
    }

    render(){
        return(
            <div className={"login"}>
					<div className={"login_box"} >
						<h4>用户登陆</h4>
                                <Input type="text" placeholder="账号"     name={"accounts"} onChange={this._onChange} onFocus={this._focus}/>
                                <Input type="password" placeholder="密码" name={"password"} onChange={this._onChange} onFocus={this._focus}/>
                                <p className={"err"}>{this.state.err}</p>
                                <Button name={"btn"} className={"btn_login"} type="primary" loading={this.state.loading} onClick={this.enterLoading} >
                                    登陆
                                </Button>
					</div>
            </div>
        )
    }
}