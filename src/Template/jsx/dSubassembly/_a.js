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
        axios.post(this.props.http+"/securitylock/web/user/getUserDeivceList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                      this.setState({
                        lis:res.data.data.device,
                        strip:res.data.data.strip
                      })
                 }else{
                     alert(res.data.message)
                 }
             })
    }
    render(){
            return(
                <div className={"_a"}>
                    <p className={"number"}>总设备:{"5"}</p>
                    <table>
                        <thead>
                            <tr>
                                <td>序号</td>
                                <td>在线情况</td>
                                <td>设备情况</td>
                                <td>设备唯一标识</td>
                            </tr>
                        </thead>
                        <tbody>
                               {this.state.lis.map((res)=><tr key={res.did}><td>{res.did}</td><td className={res.state==="1"?"y":"n"}></td><td>{res.deviceName}</td><td>{res.mac}</td></tr> )}
                        </tbody>
                    </table>
                    <div  className={"inTitle"}>
                         <div>
                            在线情况：<span>在线</span><span>不在线</span>
                        </div>
                        <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
                     </div>
                </div>
            )
    }
}