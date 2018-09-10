import React,{Component} from "react";
import {Input,Button} from "antd";

import "../../css/search.css"
export default class app extends Component{
    constructor(props){
        super(props)
        this.state={
            iconLoading:false,
            _data:""
        }
    }
    enterIconLoading=()=>{
            this.setState({
                iconLoading:true,
            })
            this.props.getSearchData(this.state._data,()=>{
                this.setState({
                    iconLoading:false,
                })  
            })
    }
    getdata=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    render(){
      
        return(
            <div className={"search"}>
                <Input type={"txt"} name={"_data"} onChange={this.getdata} placeholder={"输入"}/>
                <Button type="primary" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                   <i className={"iconfont icon-search"}></i> 搜索
                </Button>
            </div>
        )
    }
}