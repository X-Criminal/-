import React,{Component} from "react";
import {Button}          from "antd";
import Diff              from "./diff.js";
import cookie            from "react-cookies"

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            _diffBox:false,
            oid:0,
            dele:"",
        }
    }
    _onclick=(data)=> {
         this.setState({
            _diffBox:!this.state._diffBox,
         })
         if(data){
             this.setState({
                oid:data,
             })
         }
    }
    postData=(data)=>{
        this.props._diff(data,()=>{
            this._onclick( )
        })
    }
    render(){
        return(
            <div className={"datalis"}>
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>APP用户</td>
                            <td>手机号</td>
                            <td>安装地址</td>
                            <td>设备名称</td>
                            <td>设备唯一标识</td>
                            <td>状态</td>
                            <td>申请时间</td>
                            <td>维修日期</td> 
                            <td>维修人员</td>
                            {
                                cookie.load("adminInfo").data.type==="3"?
                                ""
                                :
                                <td>操作</td>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                             cookie.load("adminInfo").data.type==="3"?
                           this.props.Lis.map((res)=><tr key={res.mid}><td>{res.mid}</td><td>{res.userName}</td><td>{res.phone}</td><td>{res.installAddress}</td><td>{res.deviceName}</td><td>{res.mac}</td><td>{res.state==="1"?"以维修":"申请维修"}</td><td>{res.applyDateTime}</td><td>{res.maintenanceDate}</td><td>{res.repairPersonnel}</td></tr>)
                            :
                            this.props.Lis.map((res)=><tr key={res.mid}><td>{res.mid}</td><td>{res.userName}</td><td>{res.phone}</td><td>{res.installAddress}</td><td>{res.deviceName}</td><td>{res.mac}</td><td>{res.state==="1"?"以维修":"申请维修"}</td><td>{res.applyDateTime}</td><td>{res.maintenanceDate}</td><td>{res.repairPersonnel}</td><td><Button onClick={this._onclick.bind(this,res)}>审核</Button></td></tr>)
                        }
                    </tbody>
                </table>
                <INFO postData={this.postData} _diffBox={this.state._diffBox} oid={this.state.oid} _onclick={this._onclick.bind(this,null)}/>
            </div>
        )
    }
}

function INFO(props){
    if(props._diffBox){
        return <Diff postData={props.postData} oid={props.oid} _onclick={props._onclick}/>
    }else{
        return null;
    }
}