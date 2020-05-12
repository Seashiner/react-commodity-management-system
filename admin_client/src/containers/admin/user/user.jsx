import React, { Component } from 'react'
import {Card,Button,Table,Modal,Form,Input,Select,message} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons';
import dayjs from "dayjs";
import {reqUserInfo,reqAddUser,reqUpdateUser,reqDeleteUser} from "@/api";

const {Item} = Form
const {Option} = Select

export default class User extends Component {

	state = { 
		visible: false, //弹窗是否展示
		userInfo:[],
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

	updateUser=()=>{
		
	}

	getUserInfo = async ()=>{
		const result = await reqUserInfo()
		const {status,data,msg} = result
		const {users,roles} = data
		
    if(status === 0){
			console.log(data);
      this.setState({userInfo:users.reverse(),roleInfo:roles})      
    }else{
      message.error(msg)
    }
	}
	
	componentDidMount(){
		this.getUserInfo()
	}

	render() {
		//表格数据源
		const dataSource = this.state.userInfo;
		//表格列配置
		const columns = [
			{
				title: '姓名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				key: 'create_time',
        render:(create_time)=> dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				key: 'role_id',
        render:(id)=> {
					let role = this.state.roleInfo.find((roleObj)=>{
						return roleObj._id === id
					})
					return role.name
				}
			},
			{
				title: '操作',
				//dataIndex: 'role_id',
				key: 'action',
				align:'center',
				render:()=>(
					<div>
						<Button type="link" onClick={this.updateUser}>修改</Button>
						<Button type="link">删除</Button>
					</div>
				)
			},
		];
		return (
			<div>
				{/* Card组件 */}
				<Card 
					title={<Button onClick={this.showModal} type="primary"><PlusCircleOutlined />新增用户</Button>}
				>
					<Table
						dataSource={dataSource} //数据源
						columns={columns} //列配置
						bordered //边框
						rowKey="_id"
					/>
				</Card>
				{/* Modal弹窗 */}
				<Modal
          title="新增用户" //弹窗标题
          visible={this.state.visible} //是否展示弹窗
          onOk={this.handleOk} //确认回调
					onCancel={this.handleCancel} //关闭回调
					okText="确认"
					cancelText="取消"
        >
          <Form
						labelCol={{span:4}}
						wrapperCol={{span:18}}
						initialValues={{role_id:''}}
					>
						<Item
							name="username"
							label="用户名"
							rules={[{required:true,message:'用户名必须输入'}]}
						>
							<Input placeholder="用户名"/>
						</Item>
						<Item
							name="password"
							label="密码"
							rules={[{required:true,message:'密码必须输入'}]}
						>
							<Input placeholder="密码"/>
						</Item>
						<Item
							name="phone"
							label="手机号"
							rules={[{required:true,message:'手机号必须输入'}]}
						>
							<Input placeholder="手机号"/>
						</Item>
						<Item
							name="email"
							label="邮箱"
							rules={[{required:true,message:'邮箱必须输入'}]}
						>
							<Input placeholder="邮箱"/>
						</Item>
						<Item
							name="role_id"
							label="角色"
							rules={[{required:true,message:'用户名必须输入'}]}
						>
							<Select>
								<Option value="">请选择分类</Option>
								<Option value="1">测试分类一</Option>
								<Option value="2">测试分类二</Option>
							</Select>
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}
