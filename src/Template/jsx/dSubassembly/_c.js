import React from "react";
import axios from "axios";

import Page from "../public/Pagination.js"

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            strip:6,
            lis:[],
        }
    }
    pagingAdmin=( data )=>{
            this.init(data)
    }
    componentDidMount(){
             this.init(1)
    }
   
    init=(data)=>{
        let _data={
            numberPage:5,
            page:data,
            uid:this.props.uid
        }
        axios.post(this.props.http+"/securitylock/web/user/getUserOrderList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                      this.setState({
                        lis:res.data.data.order,
                        strip:res.data.data.strip
                      })
                 }else{
                     alert(res.data.message)
                 }
             })
    }
    render(){
            return(
                <div className={"_c"}>
                    <p className={"number"}>总订单:{"5"}</p>
                    <table>
                        <thead>
                            <tr>
                                <td>序号</td>
                                <td>商品</td>
                                <td>颜色</td>
                                <td>数量</td>
                                <td>买家留言</td>
                                <td>共计金额/元</td>
                                <td>状态</td>
                                <td>订单编号</td>
                                <td>创建时间</td>
                            </tr>
                        </thead>
                        <tbody>
                               {this.state.lis.map((res)=><tr key={res.oid}><td>{res.oid}</td><td>{res.goodsName}</td><td>{res.specName}</td><td>{res.number}</td><td>{res.message}</td><td>{res.totalPrice}</td><td>{res.state==="1"?"等待付款":res.state==="2"?"待发货":res.state==="3"?"已发货":res.state==="4"?"交易成功":res.state==="5"?"交易管理":"--"}</td><td>{res.orderId}</td><td>{res.establishDateTime}</td></tr>)}
                        </tbody>
                    </table>
                    <div className={"inTitle"}>
                        <div>
                           
                        </div>
                        <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
                     </div>
                </div>
            )
    }
}