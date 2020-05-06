
import React, { Component } from 'react'
import { Card ,Button ,Table,Modal} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';

export default class Category extends Component {

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
  
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
      },
      {
        key: '2',
        name: '胡彦祖',
      }
    ];
    
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        render:()=> <Button type="link">修改分类</Button>,
        key: 'age',
        align:'center',
        width:'20%',
      }
    ];
    return (
      <div>
        <Card extra={<Button type='primary' onClick={this.showModal}><PlusCircleOutlined />添加</Button>}>
          <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          pagination={{
            pageSize:4
          }}
          />
        </Card>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

      </div>
    )
  }
}
