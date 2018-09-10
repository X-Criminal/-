import React,{Component} from "react";
import {Select  ,Button} from "antd";
import Transition        from "../public/transition.js";

import "../../css/search.css"
const Option = Select.Option;
export default class app extends Component{

    constructor(props){
        super(props)
        this.state={
            iconLoading:false,
            provinces:"",
            rebateDateYear:"",
            state:"",
        }
    }
    enterIconLoading=()=>{
        this.setState({
            iconLoading:true,
        })
            this.props.getSalesStatistics({provinces:this.state.provinces,rebateDateYear:this.state.rebateDateYear,state:this.state.state},()=>{
                this.setState({
                    iconLoading:false,
                })
            })
    }


 
    xzInfo=(data)=>{
        let provinces="";
        for(let i = 0;i<data.length;i++){
            provinces+=data[i]
        }
        this.setState({
            provinces:provinces
        })
    }
    handleChange=( e )=>{
        this.setState({
            rebateDateYear:e||""
        })
    }
    handleChange1=(e)=>{
        this.setState({
            state:e||""
        })
    }
      
    render(){
        return(
            <div className={"search"}>
                <Transition xz={true} xzInfo={this.xzInfo}/>
                &nbsp;
                &nbsp;
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择月份"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={true}
                allowClear={true}
               >
                    <Option key={""} value={''}>月份</Option>
                    <Option key={0}  value={"01"}>一月</Option>
                    <Option key={1}  value={"02"}>二月</Option>
                    <Option key={2}  value={"03"}>三月</Option>
                    <Option key={3}  value={"04"}>四月</Option>
                    <Option key={4}  value={"05"}>五月</Option>
                    <Option key={5}  value={"06"}>六月</Option>
                    <Option key={6}  value={"07"}>七月</Option>
                    <Option key={7}  value={"08"}>八月</Option>
                    <Option key={8}  value={"09"}>九月</Option>
                    <Option key={9}  value={"10"}>十月</Option>
                    <Option key={10} value={"11"}>十一月</Option>
                    <Option key={11} value={"12"}>十二月</Option>
                </Select>
                &nbsp;
                &nbsp;
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="全部"
                optionFilterProp="children"
                onChange={this.handleChange1}
                filterOption={true}
                allowClear={true}
               >
                    <Option key={''} value={''}>所有</Option>
                    <Option key={0} value={"0"}>未审核</Option>
                    <Option key={1} value={"1"}>已审核</Option>
                </Select>
                <Button type="primary" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                   <i className={"iconfont icon-search"}></i> 搜索
                </Button>
            </div>
        )
    }
}