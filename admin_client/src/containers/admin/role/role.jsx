import React, { Component } from 'react'
import {Card,Button,Table,Modal,Form,Input,Select, message} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons';
import dayjs from "dayjs";
import {reqRoleInfo,reqAddRole,reqUpdateRole} from "@/api";
import treeList from "@/config/treeConfig";
import { Tree } from 'antd';

const {Item} = Form
const { TreeNode } = Tree;

export default class Role extends Component {

	state = { 
    roleVisible: false, //弹窗是否展示
    authVisible: false, //弹窗是否展示
    roleInfo:[],
    checkedKeys:['home'],
    id:''
	};

	//展示弹窗
	showRoleModal = () => {
    this.setState({roleVisible: true});
  };
  
  //授权弹窗打开时做数据回显
	showAuthModal = (id) => {
    let result = this.state.roleInfo.find((roleObj)=>{
      return roleObj._id === id
    })
    if(result){
      const {menus} = result
      if(menus.indexOf('home') === -1) menus.push('home')
      this.setState({authVisible: true,checkedKeys:menus,id});
    }

  };
  
	//弹窗确认按钮回调
	handleRoleOk = async () => {
    this.setState({roleVisible: false});
    const roleName = this.refs.addForm.getFieldsValue().roleName
    console.log(roleName);
    
    const result = await reqAddRole(roleName)
    const {status,msg} = result
		if(status === 0){
			message.success('添加成功')
			//重新请求数据
			this.getRoleInfo()
		}else{
			message.error(msg)
		}
  };
  
	handleAuthOk = async () => {
    this.setState({authVisible: false});
    const _id = this.state.id;
    const menus =this.state.checkedKeys;
    const result = await reqUpdateRole(_id,menus)
    const {status,msg} = result
		if(status === 0){
			message.success('授权成功')
			//重新请求数据
			this.getRoleInfo()
		}else{
			message.error(msg)
		}
  };
  
	//弹窗取消按钮回调
	handleRoleCancel = () => {
    this.setState({roleVisible: false});
  };
	handleAuthCancel = () => {
    this.setState({authVisible: false});
  };

  handleCheck=(checkedKeys)=>{
    this.setState({checkedKeys});
  }


  getRoleInfo = async ()=>{
    const result = await reqRoleInfo()
    const {status,data,msg} = result
    if(status === 0){
      this.setState({roleInfo:data.reverse()})      
    }else{
      message.error(msg)
    }
  }

  componentDidMount(){
    this.getRoleInfo()
  }

	render() {
    const treeData = treeList
		//表格数据源
		const dataSource = this.state.roleInfo
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
        render:(create_time)=> dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
        key: 'auth_time',
        render:(auth_time)=> auth_time ? dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss') :''
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
			},
			{
				title: '操作',
				dataIndex: '_id',
				key: 'action',
				align:'center',
				render:(id)=> <Button type="link" onClick={()=>{this.showAuthModal(id)}}>设置权限</Button>
			},
		];
		return (
			<div>
				{/* Card组件 */}
				<Card 
					title={<Button onClick={this.showRoleModal} type="primary"><PlusCircleOutlined />新增角色</Button>}
				>
					<Table
            rowKey="_id"
						dataSource={dataSource} //数据源
						columns={columns} //列配置
						bordered //边框
					/>
				</Card>
				{/* 新增角色Modal弹窗 */}
				<Modal
          title="新增角色" //弹窗标题
          visible={this.state.roleVisible} //是否展示弹窗
          onOk={this.handleRoleOk} //确认回调
					onCancel={this.handleRoleCancel} //关闭回调
					okText="确认"
					cancelText="取消"
        >
          <Form
            ref="addForm"
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

        <Modal
          title="设置权限" //弹窗标题
          visible={this.state.authVisible} //是否展示弹窗
          onOk={this.handleAuthOk} //确认回调
					onCancel={this.handleAuthCancel} //关闭回调
					okText="确认"
					cancelText="取消"
        >
          <Tree
            checkable
            treeData={treeData}
            onCheck={this.handleCheck}
            checkedKeys={this.state.checkedKeys}
          />
        </Modal>
			</div>
		)
	}
}
