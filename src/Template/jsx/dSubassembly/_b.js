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
        axios.post(this.props.http+"/securitylock/web/user/getUserIntegralList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                      this.setState({
                        lis:res.data.data.integral,
                        strip:res.data.data.strip
                      })
                 }else{
                     alert(res.data.message)
                 }
             })
    }
    render(){
            return(
                <div className={"_b"}>
                    <p className={"number"}>积分:{"5"}</p>
                    <table>
                        <thead>
                            <tr>
                                <td>序号</td>
                                <td>详情</td>
                                <td>积分使用情况</td>
                                <td>时间</td>
                            </tr>
                        </thead>
                        <tbody>
                               {this.state.lis.map((res)=><tr key={res.iid}><td>{res.iid}</td><td>{res.details}</td><td>{res.integralValue}</td><td>{res.date}</td></tr> )}
                        </tbody>
                    </table>
                    <div  className={"inTitle"}>
                        <div>
                            
                        </div>
                        <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
                     </div>
                </div>
            )
    }
}