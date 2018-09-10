import React,{Component} from "react";
import echarts from "echarts"


export default class app extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        let myChart = echarts.init(document.querySelector('.echarts3'));
        myChart.setOption({
            title: { text: '积分' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    render(){
        return(
            <div className={"echarts"}>
                <div className={"echarts3"} style={{"width":"100%","height":"90%"}}>

                </div>
            </div>
        )
    }
}