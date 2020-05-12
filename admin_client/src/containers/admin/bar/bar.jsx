import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

  getOption=()=>{
    return {
      title:{
        text:'商品销售报表',
      },     
      tooltip:{
        show:true
      },
      legend:{
        data:['销量','库存']
      },
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
      },
      yAxis: {
          type: 'value'
      },
      toolbox:{
        show: true,
        feature:{
          saveAsImage:{
            type: 'png' ,
          },
          restore:{},
          dataView:{}
        }
      },
      series: [
        {
          name:'销量',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
          }
        },
        {
          name:'库存',
          data: [250, 210, 100, 50, 90, 120, 135],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
          }
        },
      ]
    }
  }
  render() {
    return (
      <div style={{marginTop:'100px',padding:'0 20px'}}>
        <ReactEcharts option={this.getOption()} />
      </div>
    )
  }
}
