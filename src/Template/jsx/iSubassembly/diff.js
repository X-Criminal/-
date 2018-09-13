import React,{Component} from "react";
import {Input,Button}    from "antd";
import cookie            from "react-cookies"

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            xuanzhong:false,
            money:"",
        }
    }
    componentDidMount(){
       
    }

    open=()=>{
        this.setState({
            xuanzhong:!this.state.xuanzhong,
        })
    }
    _money=( e )=>{
            this.setState({
                money:e.target.value,
            })
    }
    postData=(idx)=>{
        let _data={
            aid:cookie.load("adminInfo").data.aid,
            rebateId:this.props.oid.rebateId,
            rebateMoney:this.state.xuanzhong?this.props.oid.salesVolume*0.1:(+this.state.money),
            state:idx,
        }
        this.props._diff( _data,()=>{
            this.props._onclick( )
        } )
    }
    
    render(){
            return(
            <div className={"Addinfo"}>
                <div className={"AddinfoBox"}>
                    <h3>审核 <i className={"deladmin"}  onClick={this.props._onclick}></i></h3>
                    <p>区域：广东省深圳市南山区&nbsp;&nbsp;&nbsp;&nbsp;管理员：{this.props.oid.adminName}&nbsp;&nbsp;&nbsp;&nbsp;月份：{this.props.oid.rebateDateYear}&nbsp;&nbsp;&nbsp;&nbsp;销售额：{this.props.oid.salesVolume}</p>
                    <div>
                         <div className={this.state.xuanzhong?"inInput  _n":"inInput  _j"}>
                             <i className={this.state.xuanzhong?"iconfont icon-xuanzhongduigou":""} onClick={this.open}></i>
                             <span>返利比例</span>
                             <Input value={"10%"} disabled={true}/>
                         </div>
                         <div className={"inInput"}>
                            <span>
                                返利金额
                            </span>
                            <Input value={this.state.xuanzhong?this.props.oid.salesVolume*0.1:this.state.money} onChange={this._money} disabled={this.state.xuanzhong?true:false}/>
                         </div>
                    </div>
                    <div>
                            <Button onClick={this.postData.bind(this,2)}>
                                决绝
                            </Button>
                            <Button type="primary" onClick={this.postData.bind(this,1)}>
                                同意
                            </Button>
                    </div>
                </div>
            </div>
            )
    }
} 