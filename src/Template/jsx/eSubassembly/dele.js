import React,{Component} from "react";
import {Button}          from "antd";


export default class App extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    _onclick=(  )=>{
        this.props.deleAdmin(this.props.dele,()=>{
            this.props.ondeleBox( )
        })
    }
    render(){
        if(this.props._deleBox){
            return(
                <div className={"Addinfo"}>
                    <div className={"AddinfoBox "}>
                        <h3>提示</h3>
                        <div className={"dele_Info"}><i className={"iconfont icon-gantanhao"}></i> <span>此操作将删除该普通管理员，是否继续？</span></div>
                        <div className={"deleBtn"}><Button onClick={this.props.ondeleBox}>取消</Button> <Button onClick={this._onclick}>确认</Button></div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }
} 