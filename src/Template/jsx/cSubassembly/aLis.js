import React,{Component} from "react";
import {Button} from "antd";

import Diff from "./diff.js";
import Dele from "./dele.js";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            diffData:{},
            _diffBox:false,
            _deleBox:false,
            deleData:0,
            accounts:"",
            password:"",
            storeName:"",
            contacts:"",
            phone:"",
            provinces:"",
            street:"",
            detailsAddress:"",
        }
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

    _onclick=(data)=>{
        this.setState({
            _diffBox:!this.state._diffBox
        })
        if(data){
          this.setState({
            diffData:data,
          })

        }
    }
    updata=(sid)=>{
        let _data={
            sid:sid,
            accounts:this.state.accounts,
            password:this.state.password,
            storeName:this.state.storeName,
            contacts:this.state.contacts,
            phone:this.state.phone,
            provinces:this.state.provinces,
            street:this.state.street,
            detailsAddress:this.state.detailsAddress,
        }
        this.props.diff(_data,()=>{
            this.setState({
                _diffBox:!this.state._diffBox
            })
        })
    }
    ondeleBox=( )=>{
        this.setState({
            _deleBox:!this.state._deleBox,
        })
    }
    dele=(idx)=>{
        this.ondeleBox()
        this.setState({deleData:idx})
    }
    render(){
        return(
            <div className={"datalis"}>
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>账号</td>
                            <td>密码</td>
                            <td>店面</td> 
                            <td>联系人</td>
                            <td>联系方式</td>
                            <td>联系地址</td>
                            <td>区域管理员</td>
                            <td>操作</td>
                        </tr>  
                    </thead>
                    <tbody>
                        {
                            this.props.lisData.map((res,idx)=><tr key={idx}><td>{res.sid}</td><td>{res.accounts}</td><td>{res.password}</td><td>{res.storeName}</td><td>{res.contacts}</td><td>{res.phone}</td><td>{res.detailsAddress}</td><td>{res.adminName}</td><td><Button onClick={this._onclick.bind(this,res)}>修改</Button><Button onClick={this.dele.bind(this,res.sid)}>删除</Button></td></tr> )
                        }
                    </tbody>
                </table>
                <DRouter http={this.props.http} updata={this.updata} diffData={this.state.diffData} _onclick={this._onclick.bind(this,null)} _diffBox={this.state._diffBox} _onchange={this._onchange}/>
                <Dele dele={this.props.dele} _deleBox={this.state._deleBox} ondeleBox={this.ondeleBox.bind(this,null)} deleData={this.state.deleData}/>
            </div>
        )
    }
}

function DRouter( props ){
    if(props._diffBox){
        return <Diff  http={props.http} updata={props.updata} diffData={props.diffData} _onclick={props._onclick.bind(this,null)} _onchange={props._onchange}/>
    }else{
        return null;
    }
}