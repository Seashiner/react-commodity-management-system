import React, { Component } from 'react'
import { Card ,Button ,Table,Modal,Form, Input,message} from 'antd';
import {connect} from 'react-redux';
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqUpdateCategory ,reqAddCategory} from '../../../api/index.js'
import {get_category,get_categoryAsync} from '../../../redux/actions/category'
import {PAGE_SIZE} from '@/config'


@connect(
  state =>({
    categoryList:state.categoryList
  }),
  {get_category,get_categoryAsync}
)
class Category extends Component {

  state = { 
    visible: false,
    name : '',
    _id:'' ,
    upDate : false
  };

  showModal = (cateObj) => {
    const {categoryForm} = this.refs
    let {name , _id} = cateObj
    this.name = ''
    this._id = ''
    this.upDate = false
    if(name && _id){
      //修改
      this.name = name
      this._id = _id
      this.upDate = true
    }
    if(categoryForm) categoryForm.setFieldsValue({categoryName:this.name})
    this.setState({visible: true});
  };

  handleOk = async () => {
    //拿到value
    const {categoryForm} = this.refs
    const {categoryName} = categoryForm.getFieldsValue()
    //验证合法性
    if(!categoryName || !categoryName.trim()){
      //不合法
      message.error('数据不能为空')
    }else{
      //合法
      let result;
      if(!this.upDate){
        result = await reqAddCategory(categoryName)
      }else{
        result = await reqUpdateCategory(this._id , categoryName)
      }

      const {status ,msg} = result
      if(status === 0){
        this.getCategoryList()
        message.success(this.upDate ? '修改分类成功' : '添加分类成功');
        this.props.get_categoryAsync()
          //重置表单
        categoryForm.resetFields()
        //隐藏弹窗
        this.setState({visible: false});
      }else{
        message.error(msg)
      }
      
    }
    
  };

  handleCancel = () => {
    const {categoryForm} = this.refs
    categoryForm.resetFields()

    this.setState({
      visible: false,
    });
  };

  // getCategoryList= async ()=>{
  //   let result = await reqCategory()
  //   this.props.get_category(result.data)
  // }

  getCategoryList=()=>{
    this.props.get_categoryAsync()    
  }

  componentDidMount(){
    this.getCategoryList()
  }
  
  render() {

    const dataSource = this.props.categoryList
    
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        //dataIndex: 'name',
        render:(cateObj)=> {
          return <Button type="link" onClick={()=>{this.showModal(cateObj)}}>修改分类</Button>
        },
        key: 'action',
        align:'center',
        width:'20%',
      },
    ];
    return (
      <div>
        <Card 
        extra={
        <Button type='primary' onClick={this.showModal}>
          <PlusCircleOutlined />添加
        </Button>
        }>
          <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          rowKey='_id'
          pagination={{
            pageSize:PAGE_SIZE
          }}
          />
        </Card>

        <Modal
          title={this.upDate ? '修改分类' :"添加分类" }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <Form ref="categoryForm" initialValues={{categoryName: this.name}}>
            <Form.Item
              name="categoryName"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Input placeholder="请输入分类名"/>
            </Form.Item>
          </Form>
        </Modal>

      </div>
    )
  }
}


export default Category