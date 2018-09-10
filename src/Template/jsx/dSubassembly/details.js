import React,{Component} from "react";

import A from "./_a.js";
import B from "./_b.js";
import C from "./_c.js";

export default class App extends Component{
    constructor(props){
            super(props)
            this.state={
                  so:[1,0,0,0]
            }
    }
    os=(idx)=>{
          let arr=[];
          for(let i=0;i<3;i++){
                if(idx===i){
                    arr.push(1)
                }
                    arr.push(0);
          }
          this.setState({
            so:arr,
          })
    }

    render(){
        if(this.props.isDetails){
            return(
                <div className={"details"}>
                    <div className={"details_box"}>
                        <h3 className={"title"}>
                            <span>
                                详情
                            </span>
                            <i onClick={this.props.coffin} className={"deladmin"}></i>
                        </h3>
                        <div className={"Nav"}>
                            <span onClick={this.os.bind(this,0)} className={this.state.so[0]===1?"s":""}>设备管理</span>
                            <span onClick={this.os.bind(this,1)} className={this.state.so[1]===1?"s":""}>积分</span>
                            <span onClick={this.os.bind(this,2)} className={this.state.so[2]===1?"s":""}>订单详情</span>
                        </div>
                        <div className={"inLis"}>
                            <Line so={this.state.so} http={this.props.http} uid={this.props.uid}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }
}

function Line(props){
    if(props.so[0]){
        return <A http={props.http} uid={props.uid}/>
    }else if(props.so[1]){
        console.log(1)
        return <B http={props.http} uid={props.uid}/>
    }else if(props.so[2]){
        console.log(2)
        return <C http={props.http} uid={props.uid}/>
    }
}