import React,{Component} from "react";
import {Button,Input} from "antd";
import { Upload, message } from 'antd';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
                isAdd:false,
                upimg:"",
        }
    }

    enterIconLoading=()=>{
        this.setState({
            isAdd:!this.state.isAdd,
        })
    }
    upimg=(data)=>{
        this.setState({
            upimg:data,
        })
    }
        render(){
        return(
            <div>
                <Button className={"addAdmin"} type="primary" icon="plus" onClick={this.enterIconLoading}>
                    添加
                </Button>
                <Addadmin _onclick={this.enterIconLoading} isAdd={this.state.isAdd} upimg={this.upimg}/>
            </div>
        )
    }
}
function Addadmin(props){
    if(props.isAdd){
        return(
            <div className={"Addinfo"}>
                <div className={"AddinfoBox"}>
                    <h4>添加  <i className={"deladmin"} onClick={props._onclick}></i></h4>
                    <div className={"upimg"}>
                        <Avatar upimg={props.upimg}/>
                    </div>
                    <div><span>商品名称</span> <Input /></div>
                    <div><span>单价</span> <Input /></div>
                    <div><span>颜色</span> <Input /></div>
                    <div><span>尺寸</span> <Input /></div>
                    <div><span>描述</span> <Input.TextArea  /></div>
                    <div className={"AddinfoEnd"}><Button onClick={props._onclick}>取消</Button><Button>确定</Button></div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg'||"image/png"||"image/bpm";
    if (!isJPG) {
      message.error('图片格式不正确！');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('请上传小于10m的图片');
    }
    return isJPG && isLt2M;
  }

  class Avatar extends React.Component {
    state = {
      loading: false,
    };
  

    handleChange = (info) => {
        if(info.file.response){
            this.props.upimg(info.file.response)
        }
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }));
      }
    }
  
    render() {
      const uploadButton = (
        <div style={{width:"100%"}}>
          <div className="ant-upload-text">请选择图片</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      );
    }
  }