import React, { Component } from 'react'
import { Card,Button,Select,Input,Table, message} from 'antd';
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import {reqProductList,reqSearchProList,reqUpdateStatus} from '@/api'


const { Option } = Select;

export default class Product extends Component {

	state = {
		productList:[],
		total:0,
    pageNum:1,
    pageSize:2,
		searchType:'productName',
		keyWord:''
	}

	upDateStatus = async (id ,currentStatus) => {

		if (currentStatus === 2) currentStatus = 1
		else currentStatus = 2

		let result = await reqUpdateStatus({id ,currentStatus})
		console.log(result);
		
	}

	getProductList = async(pageNumber=1)=>{

		let result
		if(this.isSearch){
			//搜索
			const {searchType,keyWord,pageSize} = this.state
      result = await reqSearchProList(searchType,keyWord,pageNumber,pageSize)
      
      this.isSearch = false
		}else{
			result = await	reqProductList(pageNumber,2)
    }
    
		const {status,data,msg} = result
		if(status === 0){
			const {total,list,pageNum} = data
			this.setState({productList:list,total,pageNum})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
	 this.getProductList()
	}

	render() {

		const dataSource = this.state.productList;
		
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				key: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				key: 'price',
				render:(price)=>'￥'+price 
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				align:'center',
				render:(statusObj)=>{
					const {_id , status} = statusObj
					return (
						<div>
							<Button 
								type={status === 1 ? 'danger' : 'primary'} 
								onClick={()=>{this.upDateStatus(_id,status)}}
							>
									{status === 1 ? '下架' : '上架'}
							</Button><br/>
							
							<span>{status === 1 ? '在售' : '售罄'}</span>
						</div>
					)
				}
			},
			{
				title: '操作',
				//dataIndex: 'action',
				key: 'action',
				align:'center',
				render:()=> (
					<div>
						<Button type="link">详情</Button><br/>
						<Button type="link">修改</Button>
					</div>
				)
			},
		];
		return (
			<Card 
				title={
					<div>
						<Select 
							onChange= {value => this.setState({searchType:value})} 
							defaultValue="productName"
						>
							<Option value="productName">按名称搜索</Option>
							<Option value="productDesc">按描述搜索</Option>
						</Select>
						<Input 
							onChange= {event => this.setState({keyWord:event.target.value})}
							allowClear style={{width:'20%',margin:'10px'}} 
							placeholder="请输入关键字"
						/>
						<Button 
							onClick={()=>{
								this.isSearch = true 
								this.getProductList() 
							}} 
							type="primary"><SearchOutlined 
						/>搜索
						</Button>
					</div>
				} 
				extra={
					<Button type="primary">
						<PlusCircleOutlined/>添加商品
					</Button>
				} 
			>
				<Table 
					dataSource={dataSource} 
					columns={columns} 
					bordered 
					rowKey="_id" 
					pagination={{
						total:this.state.total,
						pageSize:this.state.pageSize,
						current:this.state.pageNum,
						onChange:(page)=>{
							this.getProductList(page)
						}
					}}
				/>
			</Card>
		)
	}
}

