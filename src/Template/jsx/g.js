import React,{Component} from "react"
import axios             from "axios"
import cookie            from "react-cookies"

import "echarts/lib/chart/bar"
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import "../css/g.css"

import Secrch  from "./gSubassembly/secrch.js";
import Type1   from "./gSubassembly/type1.js";
import Type2   from "./gSubassembly/type2.js";
import Type3   from "./gSubassembly/type3.js";
export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
                Is:[1,0,0]
        }
        this._Is = this._Is.bind(this)
    }

    _Is(e){
       this.setState({
        Is:this._op(e.target.name)
       })
    }
    _op(idx){
        let data = this.state.Is;
        for(let i= 0,inx=data.length;i<inx;i++){
                data[i]=0;
        }
            data[idx-1]=1;
            return data;
    }
    SalesStatistics=(did,storeId,cb)=>{
        let type=1;
         for(let i = 0 ;i<this.state.Is.length;i++){
                if(this.state.Is[i]===1){
                        type = i+1;
                        let data={
                            aid:did,
                            storeId:storeId,
                            type:type,
                         }
                         this.getSalesStatistics(data,cb)
                }
         }
    }
    getSalesStatistics(data,cb){
         axios.post(this.props.http+"/securitylock/web/admin/getSalesStatistics",data)
         .then((res)=>{
            cb&&cb()
         })
    }

    render(){
        return(
            <div className={"a g"}>
                <h3><span><i className={"iconfont icon-shuju"}> </i> 销售统计</span></h3>
                {
                    cookie.load("adminInfo").data.type!=="4"?
                        <Secrch getSalesStatistics={this.SalesStatistics} http={this.props.http}/>
                        :
                        null
                }
                <div className={"_stateBtn"}>
                    <button onClick={this._Is} name={"1"} className={this.state.Is[0]===1?"s":""}>周</button>
                    <button onClick={this._Is} name={"2"} className={this.state.Is[1]===1?"s":""}>月</button>
                    <button onClick={this._Is} name={"3"} className={this.state.Is[2]===1?"s":""}>年</button>
                </div>
                <div className={"echartsBox clear-fix"}>
                    <Type1/>
                    <Type2/>
                    <Type3/>
                </div>
            </div>
        )
    }
}
