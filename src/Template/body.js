import React from "react";
import cookie from "react-cookies";
import {Button,Layout, Menu} from "antd";
import "./css/body.css"

//修改密码
import Uppassword from "./jsx/BodySubassembly/upDataAdminpassword.js";
/***
 * 引入需要组件
 */
import A from "./jsx/a.js";
import B from "./jsx/b.js";
import C from "./jsx/c.js";
import D from "./jsx/d.js";
import E from "./jsx/e.js";
import F from "./jsx/f.js";
import G from "./jsx/g.js";
import H from "./jsx/h.js";
import I from "./jsx/i.js";
import J from "./jsx/j.js";

const {Sider } = Layout;
const SubMenu = Menu.SubMenu;
const url = "http://172.16.10.68:8086";

const rou =  [
    {name:"普通管理员" ,jsx:<A   http={url}  />,key:"0"},
    {name:"区域管理员" ,jsx:<B   http={url} />,key:"1",icon:"icon-yonghu"},
    {name:"店面管理"   ,jsx:<C   http={url} />,key:"2",icon:"icon-dianpu"},
    {name:"APP用户"    ,jsx:<D   http={url} />,key:"3",icon:"icon-usergroup"},
    {name:"商品发布"   ,jsx:<E   http={url} />,key:"4",icon:"icon-gouwuche"},
    {name:"设备管理"   ,jsx:<F   http={url} />,key:"5",icon:"icon-shezhi"},
    {name:"销售统计"   ,jsx:<G   http={url} />,key:"6",icon:"icon-shuju"},
    {name:"订单"       ,jsx:<H   http={url} />,key:"7",icon:"icon-dingdan"},
    {name:"返利"       ,jsx:<I   http={url} />,key:"8",icon:"icon-huobiqiandaizijin"},
    {name:"售后维修"   ,jsx:<J   http={url} />,key:"9",icon:"icon-xiugai"},
]

export default class body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bodyTmp:rou,
            key:"0",
            isuppassword:false,
        }
    }
    //组件加载前生命周期
    componentWillMount (){
        let adminInfo = cookie.load("adminInfo");
        let type = adminInfo.data.type;
        // 1超级管理员，2普通管理员，3区域管理员，4门店管理员
        if((+type)===1){
            this.setState({
                bodyTmp:rou,
                key:"0"
            })
        }else if((+type)===2){
            this.setState({
                bodyTmp:this.classification(rou,["普通管理员"]),
                key:"1"
           })
           this.key=1;
        }else if((+type)===3){
            this.setState({
                bodyTmp:this.classification(rou,["普通管理员","区域管理员","店面管理","商品发布"]),
                key:"3"
           })
        }else if((+type)===4){
            this.setState({
                bodyTmp:this.classification(rou,["普通管理员","区域管理员","店面管理","商品发布","APP用户","设备管理","返利","售后维修"]),
                key:"6"
           })
        }
    }

    //区分管理员删除多余组件
    classification=( arr,index )=>{
        let tem = [];
          for(let i = 0,inx = arr.length;i<inx;i++){
            let info =true;
            for(let k = 0,inx = index.length;k<inx;k++){
                if(arr[i].name===index[k]){
                    info=false;
                    break;
                }
            }
            if(info) tem.push(arr[i]);
          }
         return tem;
    }

    rou_state=(e)=>{
        this.setState({
            key:e.key
        })
    }

    componentDidMount (){
    
    }
    SignOut=()=>{
        cookie.remove("adminInfo");
        window.location.reload();
    }
    upPassword=( )=>{
        this.setState({
            isuppassword:!this.state.isuppassword
        })
    }
    render(){
        return(
            <div className={"body clear-fix"}>
                <header>
                    <span>安防门锁</span>
                    <div className={"user"}>
                        <i></i>
                        <span>{cookie.load("adminInfo").data.accounts}</span>
                        <div className={"modify"}>
                             <div className={"modify_img"}> </div>
                             <p>{cookie.load("adminInfo").data.accounts}</p>
                             <div className={"modify_btn"} >
                                <Button type="primary" onClick={this.upPassword}>修改密码</Button>
                                <Button type="primary" onClick={this.SignOut}>退出登陆</Button>
                             </div>
                        </div>
                    </div>
                </header>
                <nav>
                    {
                        (+cookie.load("adminInfo").data.type)===1?<Tem rou_state={this.rou_state} />
                    :    
                       <TemTwo rou_state={this.rou_state} _key={this.state.key} Temp={this.state.bodyTmp}/>
                    }
                </nav>
                <div className={"router"}>
                    <Router  _key={this.state.key} />
                </div>
                <Uppassword key={"修改密码"} http={this.props.http} isup={this.state.isuppassword} _updata={this.upPassword}/>
            </div>
        )
    }
}

function Tem (props){
    return (
        <Layout style={{ height: '100' }}>
        <Sider>
          <Menu onClick={props.rou_state} theme="dark" defaultSelectedKeys={['0']} mode="inline">
          <SubMenu
              key="sub1"
              title={<span><i className="iconfont icon-yonghu"></i><span>管理员设置</span></span>}
            >
              <Menu.Item key="0">普通管理员</Menu.Item>
              <Menu.Item key="1">区域管理员</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <span><i className="iconfont icon-dianpu"></i></span>
              <span>店面管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span><i className="iconfont icon-usergroup"></i></span>
              <span>App用户</span>
            </Menu.Item>           
            <Menu.Item key="4">
              <span><i className="iconfont icon-gouwuche"></i></span>
              <span>商品发布</span>
            </Menu.Item>
            <Menu.Item key="5">
              <span><i className="iconfont icon-shezhi"></i></span>
              <span>设备管理</span>
            </Menu.Item>
            <Menu.Item key="6">
              <span><i className="iconfont icon-shuju"></i></span>
              <span>销售统计</span>
            </Menu.Item>
            <Menu.Item key="7">
              <span><i className="iconfont icon-dingdan"></i></span>
              <span>订单</span>
            </Menu.Item>
            <Menu.Item key="8">
              <span><i className="iconfont icon-huobiqiandaizijin"></i></span>
              <span>返利</span>
            </Menu.Item>
            <Menu.Item key="9">
              <span><i className="iconfont icon-xiugai"></i></span>
              <span>售后维修</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
}
function TemTwo(props){
    return (
        <Layout style={{ height: '100' }}>
        <Sider>
          <Menu onClick={props.rou_state} theme="dark" defaultSelectedKeys={[props._key]} mode="inline">
              {props.Temp.map((res)=> <Menu.Item key={res.key}> <span><i className={"iconfont "+res.icon}></i></span> <span>{res.name}</span></Menu.Item> )}
          </Menu>
        </Sider>
      </Layout>
    )
}

function Router(props){
    return rou[(+props._key)].jsx
}