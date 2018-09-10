import React,{Component} from "react";
import {Select  ,Button} from "antd";
import axios             from "axios"

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
        }
    }
    enterIconLoading=()=>{
            this.setState({
                iconLoading:true,
            })
            this.props.getSalesStatistics(this.state.did,this.state.storeId,()=>{
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

    componentDidMount(){
        this.initData( )
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
                <Button type="primary" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                   <i className={"iconfont icon-search"}></i> 搜索
                </Button>
            </div>
        )
    }
}