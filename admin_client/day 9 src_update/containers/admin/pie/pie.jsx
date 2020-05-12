import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

  getOption=()=>{
    return {
      title:{
        text:'商品销售报表',
        left: 'center'
      },     
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
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
          type: 'pie',
          radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '一月'},
              {value: 310, name: '二月'},
              {value: 234, name: '三月'},
              {value: 135, name: '四月'},
              {value: 1548, name: '五月'},
              {value: 110, name: '六月'},
              {value: 130, name: '七月'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
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

