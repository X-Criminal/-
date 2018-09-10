import React,{Component}    from "react";
import {Button}             from "antd";
import cookie               from "react-cookies";

import Dele     from "../dSubassembly/dele.js";
import Details  from "./details.js" 

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            _deleBox:false,
            deleData:" ",
            uid:"",
            isDetails:false,
        }
    }
    /**
     * 点击删除——————————————————
     */
    ondeleBox=( )=>{
        this.setState({
            _deleBox:!this.state._deleBox,
        })
    }
    dele=(idx)=>{
        this.ondeleBox()
        this.setState({deleData:idx})
    }
    /**
     * ——————————————————————————
     */

     /**
      * 详情——————————————————————
      */
     details=(data)=>{
         this.setState({
            uid:data,
            isDetails:!this.state.isDetails,
         })
     }
     //关闭详情
     coffin=()=>{
        this.setState({
            isDetails:!this.state.isDetails,
        })
     }
     /**
      * ________________________
      */

    render(){
        return(
            <div className={"datalis"}>
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>用户名</td>
                            <td>手机号</td>
                            <td>座机号</td>
                            <td>生日</td>  
                            <td>收货人姓名</td>
                            <td>安装地址</td>
                            <td>创建时间</td>
                            <td>操作</td>
                        </tr>  
                    </thead>
                    <tbody>
                        {
                            cookie.load("adminInfo").data.type==="1"?
                            this.props.lisData.map((res,idx)=><tr key={idx}><td>{res.uid}</td><td>{res.name}</td><td>{res.phone}</td><td>{res.seatNumber}</td><td>{res.birthday}</td><td>{res.consignee}</td><td>{res.installAddress}</td><td>{res.date}</td><td><Button onClick={this.details.bind(this,res.uid)}>详情</Button><Button onClick={this.dele.bind(this,res.uid)}>删除</Button></td></tr>)
                            :
                            this.props.lisData.map((res,idx)=><tr key={idx}><td>{res.uid}</td><td>{res.name}</td><td>{res.phone}</td><td>{res.seatNumber}</td><td>{res.birthday}</td><td>{res.consignee}</td><td>{res.installAddress}</td><td>{res.date}</td><td><Button onClick={this.details.bind(this,res.uid)}>详情</Button></td></tr>)
                        }
                    </tbody>
                </table>
                        <Dele dele={this.props.dele} _deleBox={this.state._deleBox} ondeleBox={this.ondeleBox.bind(this,null)} deleData={this.state.deleData}/>
                        <Details http={this.props.http} uid={this.state.uid} isDetails={this.state.isDetails} coffin={this.coffin}/>
            </div>
        )
    }
} 