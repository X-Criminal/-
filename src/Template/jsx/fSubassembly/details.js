import React,{Component} from "react";

import A from "./_a.js";
import B from "./_b.js";

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
        if(this.props.detailsBox){
            return(
                <div className={"details"}>
                    <div className={"details_box"}>
                        <h3 className={"title"}>
                            <span>
                                {this.state.so[0]===1?"报警记录":"开锁记录"}
                            </span>
                            <i onClick={this.props.coffin} className={"deladmin"}></i>
                        </h3>
                        <div className={"Nav"}>
                            <span onClick={this.os.bind(this,0)} className={this.state.so[0]===1?"s":""}>报警记录</span>
                            <span onClick={this.os.bind(this,1)} className={this.state.so[1]===1?"s":""}>开锁记录</span>
                        </div>
                        <div className={"inLis"}>
                            <Line so={this.state.so} http={this.props.http} uid={this.props.did}/>
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
        return <B http={props.http} uid={props.uid}/>
    }
}