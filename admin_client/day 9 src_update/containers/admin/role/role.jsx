import React, { Component } from 'react'
import {Card,Button,Table,Modal,Form,Input,Select, message} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqRoleInfo,reqAddRole,reqUpdateRole} from "@/api";

const {Item} = Form

export default class Role extends Component {

	state = { 
    visible: false, //弹窗是否展示
    roleInfo:[]
	};

	//展示弹窗
	showModal = () => {
    this.setState({visible: true});
	};
	
	//弹窗确认按钮回调
	handleOk = () => {
    this.setState({visible: false});
	};
	
	//弹窗取消按钮回调
	handleCancel = () => {
    this.setState({visible: false});
  };

  getRoleInfo = async ()=>{
    const result = await reqRoleInfo()
    const {status,data,msg} = result
    if(status === 0){
      this.setState({roleInfo:data.reverse()})
      console.log(data);
      
    }else{
      message.error(msg)
    }
  }

  componentDidMount(){
    this.getRoleInfo()
  }

	render() {
		//表格数据源
		const dataSource = [
			{
				key: '1',
				name: '张三',
				create_time: '2020-05-xxxxx',
				auth_time: '2020-05-xxxxx',
				auth_name: '小猪佩奇',
			},
			{
				key: '2',
				name: '李四',
				create_time: '2020-05-xxxxx',
				auth_time: '2020-05-xxxxx',
				auth_name: '小猪佩奇',
			},
		];
		//表格列配置
		const columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
			},
			{
				title: '操作',
				//dataIndex: 'role_id',
				key: 'action',
				align:'center',
				render:()=> <Button type="link">设置权限</Button>
			},
		];
		return (
			<div>
				{/* Card组件 */}
				<Card 
					title={<Button onClick={this.showModal} type="primary"><PlusCircleOutlined />新增角色</Button>}
				>
					<Table
						dataSource={dataSource} //数据源
						columns={columns} //列配置
						bordered //边框
					/>
				</Card>
				{/* 新增角色Modal弹窗 */}
				<Modal
          title="新增角色" //弹窗标题
          visible={this.state.visible} //是否展示弹窗
          onOk={this.handleOk} //确认回调
					onCancel={this.handleCancel} //关闭回调
					okText="确认"
					cancelText="取消"
        >
          <Form
						labelCol={{span:4}}
						wrapperCol={{span:18}}
					>
						<Item
							name="roleName"
							label="角色名"
							rules={[{required:true,message:'角色名必须输入'}]}
						>
							<Input placeholder="角色名"/>
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}
