import React,{Component} from "react";
import {Button} from "antd";

import Diff from "./diff.js";
import Dele from "./dele.js"

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            _diffBox:false,
            _deleBox:false,
            diff:{},
            dele:"",
        }
    }
    _onclick=(data)=> {
        this.setState({
           _diffBox:!this.state._diffBox,
        })
        if(data){
            this.setState({
               diff:data,
            })
        }
   }
   ondeleBox=(data)=>{
       this.setState({
           _deleBox:!this.state._deleBox
       })
       if(data){
               this.setState({
                   dele:data,
               })
       }
   }
    render(){
        return(
            <div className={"datalis"}>
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>商品</td>
                            <td>单价</td>
                            <td>颜色</td> 
                            <td>尺寸</td>
                            <td>图片</td>
                            <td>描述</td>
                            <td>时间</td>
                            <td>操作</td>
                        </tr>  
                    </thead>
                    <tbody>
                        {this.props.Lis.map((res)=> <tr key={res.gid}><td>{res.gid}</td><td>{res.goodsName}</td><td>{res.price}</td><td>{res.specName}</td><td>{res.goodsSize}</td><td>{res.picture}</td><td>{res.describe}</td><td>{res.date}</td><td><Button onClick={this._onclick.bind(this.res)}>修改</Button><Button onClick={this.ondeleBox.bind(this,res.gid)}>删除</Button> </td></tr> )}
                    </tbody>
                </table>
                        <Diff _diffBox={this.state._diffBox} _diff={this.props._diff} _onclick={this._onclick.bind(this,null)} diff={this.state.diff}/>
                        <Dele _deleBox={this.state._deleBox} ondeleBox={this.ondeleBox.bind(this,null)} deleAdmin={this.props.deleAdmin} dele={this.state.dele}/>
            </div>
        )
    }
} 