import React, { Component } from 'react';
import './App.css';
import cookie from "react-cookies"
import 'antd/dist/antd.css';
import "./fontLcon/iconfont.css"

import Login from "./Template/login"
import Body from "./Template/body"


class App extends Component {
  constructor(props){
      super(props);
      this.state={
           adminInfo:false,
           url:"http://172.16.10.68:8086",
      }
  }
  componentWillMount(){
        //渲染前调用
        let adminInfo = cookie.load("adminInfo");
        if(adminInfo){
              this.setState({
                adminInfo:true,
              })
        }
    }
  componentDidMount() {
    //组件第一次render时执行

    }
  _onclick=( data )=>{
    cookie.save("adminInfo",data)
    this.setState({
        adminInfo:true
    })
  }

  /**登陆.png */
  inlogin( ){
    let data = {
      data:{
        code:1000,
        data:{
          accounts:"admin",
          type:"1"
        },
        message:"登陆成功",
        success:200
      }
    }
    cookie.save("adminInfo",data);
    this.setState({
      adminInfo:true,
    })
  }
    render() {
        if(this.state.adminInfo){
            return <Body  http={this.state.url}/>
        }else{
            return <Login http={this.state.url} _onclick={this._onclick}/>
        }
  }
}

export default App;
