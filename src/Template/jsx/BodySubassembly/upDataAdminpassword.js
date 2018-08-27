import React,{Component} from "React";
import axios from "axios";
import cookie from "react-cookies";
import {Input,Button} from "antd";
import "../../css/body.css";

export default class app extends Component{
    constructor(props){
        super(props)
        this.state={
            password:"",
            newPassword:"",
            newPassword2:"",
            err:"",
        }
    }


    upData=( )=>{
        if(this.state.password.length>0&&this.state.newPassword.length>0&&this.state.newPassword2.length>0){
                if(this.state.newPassword===this.state.newPassword2){
                     if(cookie.load("adminInfo").data.password!==this.state.newPassword){
                        axios.post(this.props.http+"/securitylock/web/admin/updateAdminPasswrod",{
                            accounts:cookie.load("adminInfo").data.accounts,
                            password:this.state.password,
                            newPassword:this.state.newPassword
                           }).then((res)=>{
                               if(res.data.code===1000){
                                   cookie.remove("adminInfo");
                                   alert("更改成功请重新登陆！");
                                   window.location.reload();
                               }else{
                                   this.setState({
                                       err:res.data.message
                                   })
                               }
                           })
                     }else{
                         this.setState({
                              err:"新旧密码一致"
                         })
                     }
                }else{
                    this.setState({
                        err:"两次密码输入不一致",
                    })
                }
        }else{
            this.setState({
                err:"信息请填写完整",
            })
        }
    }
    _cochange=(e)=>{
        this.setState({
                [e.target.name]:e.target.value,
        })
    }
    _focus=()=>{
        this.setState({
            err:""
        })
    }
    render(){
        if(this.props.isup){
            return(
                <div className={"upData"}>
                    <div className={"upData_box"}>
                          <h3>修改密码</h3>
                          <p>登陆账号:{cookie.load("adminInfo").data.accounts}</p>
                          <div><span>旧密码</span><Input onChange={this._cochange} onFocus={this._focus} name={"password"} type={"password"}/></div>
                          <div><span>新密码</span><Input onChange={this._cochange} onFocus={this._focus} name={"newPassword"} type={"password"}/></div>
                          <div><span>确认密码</span><Input onChange={this._cochange} onFocus={this._focus} name={"newPassword2"} type={"password"}/></div>
                          <p className={"err"} style={{"textAlign":"center","color":"red"}}>{this.state.err}</p>
                          <div className={"upDatabtn"}><Button onClick={this.props._updata}>退出</Button> <Button onClick={this.upData}>确定</Button></div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
       
    }
}