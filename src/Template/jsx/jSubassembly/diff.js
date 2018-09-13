import React,{Component}                    from "react";
import {Button,Input,DatePicker }           from "antd";
import locale from 'antd/lib/date-picker/locale/zh_CN';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            accounts:"",
            password:"",
            name:"",
            phone:"",
            maintenanceDate:"",
            repairPersonnel:"",
        }
    }
    componentDidMount(){
        
    }
   
    postData=( )=>{
        let _data={
            maintenanceDate:this.state.maintenanceDate,
            mid:this.props.oid.mid,
            repairPersonnel:this.state.repairPersonnel,
        }
        this.props.postData(_data)
    }
    DateChange=(a,b)=>{
        this.setState({
            maintenanceDate:b
        })
    }
    repairPersonnel=(e)=>{
            this.setState({
                repairPersonnel:e.target.value,
            })
    }
    render(){
            return(
            <div className={"Addinfo"}>
                <div className={"AddinfoBox"}>
                    <h3>维修 <i className={"deladmin"}  onClick={this.props._onclick}></i></h3>
                    <p>APP用户：{this.props.oid.userName}&nbsp;&nbsp;设备名称：{this.props.oid.deviceName}&nbsp;&nbsp;</p>
                    <div className={"userData clear-fix"}>
                        <div className={"clear-fix"}>
                            <span>维修人员</span>
                            <Input onChange={this.repairPersonnel}/>
                        </div>
                        <div className={"clear-fix"}>
                            <span>维修日期</span>
                            <DatePicker onChange={this.DateChange} locale={locale}/>
                        </div>
                    </div>
                    <div className={"jBtn"}>
                        <Button onClick={this.props._onclick}>取消</Button>
                        <Button onClick={this.postData} type="primary">确定</Button>
                    </div>
                </div>
            </div>
            )
    }
} 