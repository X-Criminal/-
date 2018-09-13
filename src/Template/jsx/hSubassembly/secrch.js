import React,{Component} from "react";
import {Select  ,Button} from "antd";
import axios             from "axios"
import cookie            from "react-cookies"

import "../../css/search.css"
const Option = Select.Option;
export default class app extends Component{

    constructor(props){
        super(props)
        this.state={
            iconLoading:false,
            getProvinces:[],
            StoreList:[],
            did:1,
            storeId:1,
            state:0,
        }
    }
    enterIconLoading=()=>{
        this.setState({
            iconLoading:true,
        })
            this.props.getSalesStatistics({did:this.state.did,storeId:this.state.storeId,state:this.state.state},()=>{
                this.setState({
                    iconLoading:false,
                })
            })
    }

    handleChange=(e)=>{
       this.setState({
            storeId:e,
       })
    }

    handleChange1=(e)=>{
        this.setState({
            did:e
        })
        this.GetStoreList(e,(res)=>{
            this.setState({
                StoreList:res.data.data,
            })
        })
    }
    handleChange2=(e)=>{
        this.setState({
            state:e
        })
    }

    componentDidMount(){
        if(cookie.load("adminInfo").data.type!=="3"){
            this.initData( )
        }else{
            this.GetStoreList(cookie.load("adminInfo").data.aid)
        }
    }

    initData=()=>{
        axios.get(this.props.http+"/securitylock/web/admin/getProvinces")
        .then((res)=>{
            if(res.data.code===1000){
                this.setState({
                    getProvinces:res.data.data
                })
            }else{
               alert(res.data.message)
            }
        })
    }
    GetStoreList=(e,cb)=>{
        axios.get(this.props.http+"/securitylock/web/admin/getStoreListByAid?aid="+e)
        .then((res)=>{
            if(res.data.code===1000){
                cb&&cb(res);
            }else{
                alert(res.data.message)
            }
           
        })
    }
      
    render(){
        return(
            <div className={"search"}>  
                {
                    cookie.load("adminInfo").data.type==="4"|| cookie.load("adminInfo").data.type==="3"?
                    null
                    :
                <Select
                    showSearch
                    style={{ width: 260 }}
                    placeholder="地区"
                    optionFilterProp="children"
                    onChange={this.handleChange1}
                    filterOption={true}
                    allowClear={true}
                    >
                    {this.state.getProvinces.map((res,idx)=><Option key={idx} value={res.aid}>{res.provinces}</Option>)}
                </Select> 
                }
                {
                    cookie.load("adminInfo").data.type!=="4"?
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="店面"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={true}
                        allowClear={true}
                    >
                            {this.state.StoreList.map((res,idx)=> <Option key={idx} value={res.storeId}>{res.storeName}</Option> )}
                    </Select>
                    :
                    null
                }
                &nbsp; &nbsp;
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="状态"
                optionFilterProp="children"
                onChange={this.handleChange2}
                filterOption={true}
                allowClear={true}
               >
                    <Option key={0} value={0}>全部</Option>
                    <Option key={1} value={1}>等待付款</Option>
                    <Option key={2} value={2}>待发货</Option>
                    <Option key={3} value={3}>已发货</Option>
                    <Option key={4} value={4}>交易成功</Option>
                    <Option key={5} value={5}>交易关闭</Option>
                </Select>
                <Button type="primary" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                   <i className={"iconfont icon-search"}></i> 搜索
                </Button>
            </div>
        )
    }
}