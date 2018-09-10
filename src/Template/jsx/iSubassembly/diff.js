import React,{Component} from "react";


export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            accounts:"",
            password:"",
            name:"",
            phone:""
        }
    }
    componentDidMount(){
        
    }
   
    postData=( )=>{
        let data={
            accounts:this.state.accounts,
            password:this.state.password,
            name:this.state.name,
            phone:this.state.phone,
            aid:this.props.diff.aid,
        }
        this.props._diff( data,()=>{
            this.props._onclick( )
        } )
    }
    
    render(){
            return(
            <div className={"Addinfo"}>
                <div className={"AddinfoBox"}>
                    <h3>审核 <i className={"deladmin"}  onClick={this.props._onclick}></i></h3>
                    <p>区域：广东省深圳市南山区&nbsp;&nbsp;管理员：段明明&nbsp;&nbsp;月份：2018-3&nbsp;&nbsp;销售额：998</p>
                   
                </div>
            </div>
            )
    }
} 