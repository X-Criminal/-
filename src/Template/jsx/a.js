import React,{Component} from "react";

import "./public/search.js"
import "../css/a.css";

export default class app extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className={"a"}>
                <h3><span><i className={"iconfont icon-yonghu"}></i>管理员设置 </span><span>/ 普通管理员</span></h3>
            </div>
        )
    }
}
