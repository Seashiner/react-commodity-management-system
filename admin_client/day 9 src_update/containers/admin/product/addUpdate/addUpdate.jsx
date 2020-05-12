import React, { Component } from 'react'
import { Form, Input, Button ,Card ,Select,message } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import Picture from "./picture/picture";
import RichText from "./richText/richText";
import {get_categoryAsync} from "@/redux/actions/category";
import {reqAddProduct,reqProductInfo,reqUpdateProduct} from "@/api";

const {Item} = Form
const {Option} = Select

@connect(
  (state)=>({categoryList:state.categoryList}),
  {get_categoryAsync}
)
class AddUpdate extends Component {

  state={
    isUpdate:false,
    isLoading:false,
    id:''
  }

  getProductInfoById = async (id)=>{
    this.setState({isLoading:true})
    const result = await reqProductInfo(id)

    const {status,data,msg} = result
    if(status === 0){
      this.setState({isLoading:false})
      const {name,desc,price,categoryId,imgs,detail} = data
      this.refs.addUpdateForm.setFieldsValue({name,desc,price,categoryId})
      this.refs.picture.setFileListByImg(imgs)
      this.refs.richText.setEditorContent(detail)
      // message.success('成功')
    }else{
      message.error(msg)
    }
  }

  onFinish = async (values)=>{
    values.imgs = this.refs.picture.fileNameArr()
    values.detail = this.refs.richText.getEditorContent()
    let result;
    if(this.state.isUpdate){
      values._id = this.state.id
      result = await reqUpdateProduct(values)
    }else{
      result = await reqAddProduct(values)
    }
    
    const {status,msg} = result
    if(status === 0){
      message.success(this.state.isUpdate ?'修改成功':'添加成功')
      this.props.history.replace('/admin/prod_about/product')
    }else{
      message.error(msg)
    }
  }

  componentDidMount(){
    if(this.props.categoryList.length === 0){
      this.props.get_categoryAsync()
    }  
    const {id} = this.props.match.params  
    if(id){
      this.setState({isUpdate:true,id})
      this.getProductInfoById(id)
    }else{
      this.setState({isUpdate:false})
    }
  }

  render() {
    return (
      <Card 
        loading={this.state.isLoading}
        title={
          <div>
            <Button type = 'link' onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined />返回</Button>
            <span>{this.state.isUpdate ? '修改商品' : '添加商品'}</span>
          </div>
        }>
        <Form
          ref="addUpdateForm"
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
									return <Option key={categoryObj._id} value={categoryObj._id}>{categoryObj.name}</Option>
								})
							}
            </Select>
          </Item>

          <Item
            label="商品图片"
            name="imgs"
            style={{marginLeft:'12px'}}
          >
            <Picture ref="picture"/>
          </Item>

          <Item
            label="商品详情"
            name="detail"
            wrapperCol={{span:20}}
            style={{marginLeft:'12px'}}
          >
            <RichText ref="richText"/>
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
