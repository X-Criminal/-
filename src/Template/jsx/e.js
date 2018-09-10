import React,{Component} from "react";
import axios             from "axios";

import Search   from "./public/search.js";
import AddAdmin from "./eSubassembly/addAdmin.js";
import Alis     from "./eSubassembly/eLis.js";
import Page     from "./public/Pagination.js";
import "../css/e.css";

export default class app extends Component{
    constructor(props){
        super(props);
        this.state={
            numPage:0,//总页数
            strip:0, //总条数
            infodata:null,
            numberPage:5,
            Lis:[],
            condition:"",
        }
    }
    componentDidMount(){
        this.init()
    }

    init=(data,cb)=>{
        let _data=null;
            if(data){
                _data=data;
            }else{
                _data={
                    numberPage:this.state.numberPage,
                    page:1,
                    condition:this.state.condition
                }
            }
        axios.post(this.props.http+"/securitylock/web/admin/getGoodsLists",_data)
        .then((res)=>{
            if(res.data.code===1000){
                this.setState({
                    Lis:res.data.data.goods,
                    strip:res.data.data.strip
                })
               
            }else{
                alert(res.data.message)
            }
            cb&&cb()
        })
    }
/**
 * 
 * 搜索
 */
    SearchAdmin=(data,cb)=>{
      this.setState({
        condition:data,
      })
      this.init(false,()=>{
          cb&&cb()
      })
    }
/**
 * 
 * 添加
 */
    upAdmin=( data,cb )=>{
        
  
    }
 /***
  * 
  * 修改
  */
    _diff=(data,cb)=>{
        console.log("修改数据",data);
     
    }
/**
 * 
 * 删除数据
 */
    deleAdmin=(data,cb)=>{
     
    }
/***
* 
* 翻页数据
*/
    pagingAdmin=(data)=>{
     
    }
    render(){
        return(
            <div className={"a e"}>
                <h3><span><i className={"iconfont icon-yonghu"}></i>管理员设置 </span><span>/ 普通管理员</span></h3>
                <div><Search getSearchData={this.SearchAdmin}/><AddAdmin upAdmin={this.upAdmin}/></div>
                <Alis Lis={this.state.Lis} _diff={this._diff} deleAdmin={this.deleAdmin}/>
                <Page strip={this.state.strip} pageTo={this.pagingAdmin}/>
            </div>
        )
    }
}
