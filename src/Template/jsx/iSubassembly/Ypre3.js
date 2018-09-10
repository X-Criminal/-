import React,{Component} from "react";
import {Button}          from "antd";


export default class App extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div className={"type3"}>
                  <Button>
                    <i className={"iconfont  icon-jinrongyinhang"}></i>
                    &nbsp; 
                        申请
                  </ Button>
            </div>
        )
    }

}