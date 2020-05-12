import React, { Component } from 'react'
import { Card,Button,List,Message } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {reqProductInfo} from '@/api'
import {IMG_BASE_URL} from '@/config'
import {get_categoryAsync} from "@/redux/actions/category";

const {Item} = List

@connect(
  (state)=>({categoryList:state.categoryList}),
  {get_categoryAsync}
)
class Detail extends Component {

  state={
    thisProductInfo:{imgs:[]}
  }

  getProductInfo = async ()=>{
    const {id} = this.props.match.params
    const result = await reqProductInfo(id)
    const {data,status,msg} = result
    
    if(status === 0){
      this.setState({thisProductInfo:data})
    }else{
      Message.error(msg)
    }
  }

  computedCateName=(id)=>{
    const {categoryList} = this.props
    let result = categoryList.find((category)=>{
      return category._id === id
    })
    if(result) return result.name
  }

  componentDidMount(){
    this.getProductInfo()

    if(this.props.categoryList.length === 0){
      this.props.get_categoryAsync()
    }    
  }

  render() {
    const {name,desc,price,categoryId,imgs,detail} = this.state.thisProductInfo
    return (
      <div>
        <Card title={
          <div>
            <Button type = 'link' onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined />返回</Button>
            <span>商品详情</span>
          </div>
        }>

          <List>
            <Item>
              <div>
                <span style={{fontWeight:'bold'}}>商品名称：</span>
                <span>{name}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span style={{fontWeight:'bold'}}>商品描述：</span>
                <span>{desc}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span style={{fontWeight:'bold'}}>商品价格：</span>
                <span>{'￥' + price}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span style={{fontWeight:'bold'}}>所属分类：</span>
                <span>{this.computedCateName(categoryId)}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span style={{fontWeight:'bold'}}>商品图片：</span>
                {
                  imgs.map((imgName)=>{
                    return <img key={imgName} src={IMG_BASE_URL+imgName} alt={name}/>
                  })
                }
              </div>
            </Item>
            <Item>
              <div>
                <span style={{fontWeight:'bold'}}>商品详情：</span>
                <p dangerouslySetInnerHTML={{__html:detail}} style={{marginLeft:'80px'}}/>
              </div>
            </Item>
          </List>

        </Card>
      </div>
    )
  }
}

export default Detail
