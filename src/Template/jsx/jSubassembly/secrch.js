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
                placeholder="全部"
                optionFilterProp="children"
                onChange={this.handleChange1}
                filterOption={true}
                allowClear={true}
               >
                    <Option key={''} value={''}>所有</Option>
                    <Option key={0} value={"0"}>申请维修</Option>
                    <Option key={1} value={"1"}>已维修</Option>
                </Select>
                <Button type="primary" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                   <i className={"iconfont icon-search"}></i> 搜索
                </Button>
            </div>
        )
    }
}