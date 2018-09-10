import React,{Component} from "react";
import {Button,Steps }           from "antd";
const Step =Steps.Step;

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            accounts:"",
            password:"",
            name:"",
            phone:""
        }
    }
    componentDidMount(){
        
    }
   
    postData=( )=>{
        let data={
            accounts:this.state.accounts,
            password:this.state.password,
            name:this.state.name,
            phone:this.state.phone,
            aid:this.props.diff.aid,
        }
        this.props._diff( data,()=>{
            this.props._onclick( )
        } )
    }
    
    render(){
            return(
            <div className={"Addinfo"}>
                <div className={"AddinfoBox"}>
                    <h3>物流详情 <i className={"deladmin"}  onClick={this.props._onclick}></i></h3>
                    <p>订单状态：已发货</p>
                    <table>
                         <thead>
                             <tr>
                                 <td>订单编号</td>
                                 <td>创建名称</td>
                                 <td>收货信息</td>
                                 <td>操作</td>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td>1388888888</td>
                                 <td>2018-08-09 22:22:00</td>
                                 <td>广东省深圳市南山区XX路1328号 段朗朗 021-68686868</td>
                                 <td><Button>更新物流</Button></td>
                             </tr>
                         </tbody>
                    </table>
                    <p className={"logisticsState"}>物流状态：运输中</p>
                    <hr />
                    <div>
                         <Steps progressDot direction={"vertical"} size={"small"}>
                            <Step status={"wait "}   title="第一步" />
                            <Step status={"wait  "}  title="第二步" />
                            <Step status={"wait  "}  title="第三步" />
                            <Step status={"finish "} title="第三步" />
                        </Steps>
                    </div>
                </div>
            </div>
            )
    }
} 