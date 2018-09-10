import React,{Component} from "react";
import {Pagination} from "antd";
import "../../css/pagination.css"

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className={"Pagination"}>
               <span>共{this.props.strip}条 </span> <Pagination defaultPageSize={5} onChange={this.props.pageTo} showQuickJumper defaultCurrent={1} total={this.props.strip}  />
            </div>
        )
    }
}