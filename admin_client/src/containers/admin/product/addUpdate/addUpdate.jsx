import React, { Component } from 'react'
import { Form, Input, Button ,Card ,Select } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import Picture from "./picture/picture";
import {get_categoryAsync} from "@/redux/actions/category";


const {Item} = Form
const {Option} = Select

@connect(
  (state)=>({categoryList:state.categoryList}),
  {get_categoryAsync}
)
class AddUpdate extends Component {

  onFinish=(values)=>{
    console.log(values);
    
  }

  componentDidMount(){
    if(this.props.categoryList.length === 0){
      this.props.get_categoryAsync()
    }    
  }

  render() {
    return (
      <Card title={
        <div>
          <Button type = 'link' onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined />返回</Button>
          <span>添加商品</span>
        </div>
      }>
        <Form
          onFinish={this.onFinish}
        >
          <Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: '必须输入!' }]}
            wrapperCol={{span:8}}
          >
            <Input placeholder="商品名称"/>
          </Item>

          <Item
            label="商品描述"
            name="desc"
            rules={[{ required: true, message: '必须输入!' }]}
            wrapperCol={{span:8}}
          >
            <Input placeholder="商品描述"/>
          </Item>

          <Item
            label="商品价格"
            name="price"
            rules={[{ required: true, message: '必须输入!' }]}
            wrapperCol={{span:8}}
          >
            <Input  
              placeholder="商品价格" 
              addonAfter='元' 
              addonBefore="￥" 
              type = 'number'
            />
          </Item>

          <Item
            label="商品分类"
            name="categoryId"
            rules={[{ required: true, message: '必须输入!' }]}
            wrapperCol={{span:8}}
          >
            <Select>
              <Option value="">请选择分类</Option>
              {
                this.props.categoryList.map((categoryObj)=>{
                  return <Option key={categoryObj._Id} value={categoryObj._id}>{categoryObj.name}</Option>
                })
              }
            </Select>
          </Item>

          <Item
            label="商品图片"
            name="imgs"
            style={{marginLeft:'12px'}}
          >
            <Picture/>
          </Item>

          <Item
            label="商品详情"
            name="detail"
            style={{marginLeft:'12px'}}
          >
            
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default AddUpdate