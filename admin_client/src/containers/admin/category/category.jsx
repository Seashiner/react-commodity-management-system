import React, { Component } from 'react'
import { Card ,Button ,Table,Modal,Form, Input} from 'antd';
import {connect} from 'react-redux';
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqCategory} from '../../../api/index.js'
import {get_category,get_categoryAsync} from '../../../redux/actions/category'


@connect(
  state =>({
    categoryList:state.categoryList
  }),
  {get_category,get_categoryAsync}
)
class Category extends Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
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
        render:()=> <Button type="link">修改分类</Button>,
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
            pageSize:4
          }}
          />
        </Card>

        <Modal
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <Form>
            <Form.Item
              name="category"
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