import React from "react";
import axios from "axios";

import Page from "../public/Pagination.js"

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            strip:1,
            lis:[{
                userName:"",
                derviceName:"",
                alarminformation:[],
            }],
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
            did:this.props.uid
        }
        axios.post(this.props.http+"/securitylock/web/admin/getAlarminformationList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                      this.setState({
                        lis:res.data.data.lock,
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
                    <p className={"number derviceName"}>APP用户：{this.state.lis[0].userName}&nbsp;&nbsp; 设备名称:{this.state.lis[0].derviceName}</p>
                    <table>
                        <thead>
                            <tr>
                                <td>序号</td>
                                <td>内容</td>
                                <td>报警时间</td>
                            </tr>
                        </thead>
                        <tbody>
                               {this.state.lis[0].alarminformation.map((res)=><tr key={res.id}><td>{res.id}</td><td>{res.describe}</td><td>{res.date}</td></tr> )}
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