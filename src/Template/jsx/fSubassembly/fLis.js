import React,{Component} from "react";
import {Button} from "antd";

import Details from "./details.js"

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
                did:"",
         detailsBox:false,
        }
    }
    details=(data)=>{
        this.setState({
            did:data,
            detailsBox:!this.state.detailsBox,
        })
    }
    coffin=()=>{
        this.setState({
            detailsBox:!this.state.detailsBox,
        })
     }

    render(){
        return(
            <div className={"datalis"}>
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>设备状态</td>
                            <td>设备</td>
                            <td>APP用户</td> 
                            <td>手机号</td>
                            <td>安装地址</td>
                            <td>安装时间</td>
                            <td>操作</td>
                        </tr>  
                    </thead>
                    <tbody>
                        {this.props.lis.map((res)=><tr key={res.did}><td>{res.did}</td><td><span className={res.state==="1"?"ico _z":res.state==="2"?"ico _y":res.state==="3"?"ico _q":"ico __b"}></span></td><td>{res.deviceName}</td><td>{res.userName}</td><td>{res.phone}</td><td>{res.installAddress}</td><td>{res.date}</td><td><Button onClick={this.details.bind(this,res.did)}>详情</Button></td></tr> )}
                    </tbody>
                </table>
                <Details http={this.props.http} did={this.state.did} detailsBox={this.state.detailsBox} coffin={this.coffin}/>
            </div>
        )
    }
} 