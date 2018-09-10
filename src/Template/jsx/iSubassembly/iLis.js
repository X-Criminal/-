import React,{Component} from "react";
import {Button} from "antd";
import Diff from "./diff.js";

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
    render(){
        return(
            <div className={"datalis"}>
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>区域</td>
                            <td>管理员</td>
                            <td>月份</td> 
                            <td>销售额</td>
                            <td>返利金额</td>
                            <td>审核状态</td>
                            <td>申请时间</td>
                            <td>审核时间</td>
                            <td>操作</td>
                        </tr>  
                    </thead>
                    <tbody>
                        {
                           this.props.Lis.map((res,idx)=><tr key={idx}><td>{res.rebateId}</td><td>{res.provinces}</td><td>{res.adminName}</td><td>{res.rebateDateYear}</td><td>{res.salesVolume}</td><td>{res.rebateMoney}</td><td>{res.state}</td><td>{res.applyDate}</td><td>{res.endDate}</td><td><Button onClick={this._onclick.bind(this,res.aid)}>审核</Button></td></tr>)
                        }
                    </tbody>
                </table>
                <INFO _diffBox={this.state._diffBox} oid={this.state.oid} _onclick={this._onclick.bind(this,null)}/>
            </div>
        )
    }
}

function INFO(props){
    if(props._diffBox){
        return <Diff oid={props.oid} _onclick={props._onclick}/>
    }else{
        return null;
    }
}