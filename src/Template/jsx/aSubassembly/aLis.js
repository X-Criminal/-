import React,{Component} from "react";
import {Button} from "antd";
import Diff from "./diff.js";
import Dele from "./dele.js";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            _diffBox:false,
            _deleBox:false,
            diff:{},
            dele:"",
        }
    }
    _onclick=(data)=> {
         this.setState({
            _diffBox:!this.state._diffBox,
         })
         if(data){
             this.setState({
                diff:data,
             })
         }
    }
    ondeleBox=(data)=>{
        this.setState({
            _deleBox:!this.state._deleBox
        })
        if(data){
                this.setState({
                    dele:data,
                })
        }
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
                            <td>姓名</td> 
                            <td>联系方式</td>
                            <td>操作</td>
                        </tr>  
                    </thead>
                    <tbody>
                        {
                           this.props.Lis.map((res,idx)=><tr key={idx}><td>{res.aid}</td><td>{res.accounts}</td><td>{res.password}</td><td>{res.name}</td><td>{res.phone}</td><td><Button onClick={this._onclick.bind(this,{aid:res.aid,accounts:res.accounts,password:res.password,name:res.name,phone:res.phone})}>修改</Button><Button onClick={this.ondeleBox.bind(this,res.aid)}>删除</Button></td></tr>)
                        }
                    </tbody>
                </table>
                <Diff _diffBox={this.state._diffBox} _diff={this.props._diff} _onclick={this._onclick.bind(this,null)} diff={this.state.diff}/>
                <Dele _deleBox={this.state._deleBox} ondeleBox={this.ondeleBox.bind(this,null)} deleAdmin={this.props.deleAdmin} dele={this.state.dele}/>
            </div>
        )
    }
} 