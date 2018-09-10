import React,{Component} from "react";
import {Button,Input} from "antd"

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
                isAdd:false,
        }
    }

    enterIconLoading=()=>{
        this.setState({
            isAdd:!this.state.isAdd,
        })
    }
        render(){
        return(
            <div>
                <Button className={"addAdmin"} type="primary" icon="plus" onClick={this.enterIconLoading}>
                    添加
                </Button>
                <Addadmin _onclick={this.enterIconLoading} isAdd={this.state.isAdd}/>
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
                    <div><span>账号</span> <Input /></div>
                    <div><span>密码</span> <Input /></div>
                    <div><span>姓名</span> <Input /></div>
                    <div><span>联系方式</span> <Input /></div>
                    <div className={"AddinfoEnd"}><Button onClick={props._onclick}>取消</Button><Button>确定</Button></div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}