import React,{Component} from "react";
import {Button} from "antd";
import Diff from "./diff.js";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            _diffBox:false,
            oid:0,
            dele:"",
        }
    }
    _onclick=(data)=> {
         this.setState({
            _diffBox:!this.state._diffBox,
         })
         if(data){
             this.setState({
                oid:data,
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
                            <td>店面</td>
                            <td>APP用户</td>
                            <td>商品</td> 
                            <td>颜色</td>
                            <td>尺寸</td>
                            <td>数量</td>
                            <td>买家留言</td>
                            <td>共计金额/元</td>
                            <td>积分</td>
                            <td>订单编号</td>
                            <td>创建时间</td>
                            <td>订单状态</td>
                            <td>操作</td>
                        </tr>  
                    </thead>
                    <tbody>
                        <tr>
                            <td>87</td>
                            <td>xxx店面</td>
                            <td>xxAPP用户</td>
                            <td>xx商品</td> 
                            <td>xx颜x色</td>
                            <td>xx尺寸</td>
                            <td>xx数x量</td>
                            <td>xxx买家留言</td>
                            <td>xxx共计金额/元</td>
                            <td>xxxx积分</td>
                            <td>xx订x单编号</td>
                            <td>xx创xx建时间</td>
                            <td>xxxx订单状态</td>
                            <td><Button onClick={this._onclick.bind(this,0.9)}>物流详情</Button></td>
                        </tr>
                        {
                           this.props.Lis.map((res)=><tr key={res.oid}><td>{res.oid}</td><td>{res.storeName}</td><td>{res.userName}</td><td>{res.goodsName}</td><td>{res.specName}</td><td>{res.goodsSize}</td><td>{res.number}</td><td>{res.message}</td><td>{res.totalPrice}</td><td>{res.availableIntegral}</td><td>{res.orderId}</td><td>{res.establishDateTime}</td><td>{res.state==="1"?"等待付款":res.state==="2"?"待发货":res.state==="3"?"已发货":res.state==="4"?"交易成功":"交易关闭"}</td><td><Button onClick={this._onclick.bind(this,res.oid)}>物流详情</Button></td></tr>)
                        }
                    </tbody>
                </table>
                <INFO _diffBox={this.state._diffBox} oid={this.state.oid} _onclick={this._onclick.bind(this,null)}/>
            </div>
        )
    }
}

function INFO(props){
    if(props._diffBox){
        return <Diff oid={props.oid} _onclick={props._onclick}/>
    }else{
        return null;
    }
}