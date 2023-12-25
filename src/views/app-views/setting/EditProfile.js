import React, { Component } from 'react';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import Loading from 'components/shared-components/Loading';
import {setUsers,changeUser} from "redux/actions/Users"
import {connect} from "react-redux"



export class EditProfile extends Component {
	constructor(props) {
		super(props);
	}
	avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

	state= {
		avatarUrl: '',
		name: '',
		email: '',
		userName: '',
		dateOfBirth: null,
		phoneNumber: '',
		website: '',
		address: '',
		city: '',
		postcode: ''
	}
	componentDidMount(){
		if(!this.props.users.length){
			fetch(`https://jsonplaceholder.typicode.com/users`)
			.then(res=>res.json())
			.then(data=>{
				this.props.setUsers(data.map(a=>({...a,img:`/img/avatars/thumb-${a.id}.jpg`})))
				const neededUser = data.find(a=>a.id == this.props.params.id)
				if(neededUser){
					this.setState({
						avatarUrl: `/img/avatars/thumb-${neededUser.id}.jpg`,
						name: neededUser.name,
						email: neededUser.email,
						userName: neededUser.username,
						phoneNumber: neededUser.phone,
						website: neededUser.website,
						address: '',
						city: neededUser.address.city,
					})					
				}

			})
			.catch(a=>console.log(a))			
		}else {
			const neededUser = this.props.users.find(a=>a.id == this.props.params.id)
			if(neededUser){
				this.setState({
					avatarUrl: `/img/avatars/thumb-${neededUser.id}.jpg`,
					name: neededUser.name,
					email: neededUser.email,
					userName: neededUser.username,
					phoneNumber: neededUser.phone,
					website: neededUser.website,
					address: '',
					city: neededUser.address.city,
				})					
			}
		}

	}
	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	render() {

		const onFinish = values => {
			const key = 'updatable';
			message.loading({ content: 'Updating...', key });
			setTimeout(() => {
				const neededUser = {...this.props.users.find(a=>a.id==this.props.params.id)}
				this.setState({
					name: values.name,
					email: values.email,
					userName: values.userName,
					dateOfBirth: values.dateOfBirth,
					phoneNumber: values.phoneNumber,
					website: values.website,
					address: values.address,
					city: values.city,
					postcode: values.postcode,
				})
				message.success({ content: 'Done!', key, duration: 2 });
				this.props.changeUser({
					...neededUser,
					name: values.name,
					email: values.email,
					username: values.userName,
					phone: values.phoneNumber,
					address:{...neededUser.address, city:values.city}
					})
			}, 1000);
		};
	
		const onFinishFailed = errorInfo => {
			console.log('Failed:', errorInfo);
		};

		const onUploadAavater = info => {
			const key = 'updatable';
			if (info.file.status === 'uploading') {
				message.loading({ content: 'Uploading...', key, duration: 1000 });
				return;
			}
			if (info.file.status === 'done') {
				this.getBase64(info.file.originFileObj, imageUrl =>
					this.setState({
						avatarUrl: imageUrl,
					}),
				);
				message.success({ content: 'Uploaded!', key,  duration: 1.5 });
			}
		};

		const onRemoveAvater = () => {
			this.setState({
				avatarUrl: ''
			})
		}

		const { name, email, userName, dateOfBirth, phoneNumber, website, address, city, postcode, avatarUrl } = this.state;

		return (
			<>
				{name
					?
<>
				<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
					<Avatar size={90} src={avatarUrl} icon={<UserOutlined />}/>
					<div className="ml-md-3 mt-md-0 mt-3">
						<Upload onChange={onUploadAavater} showUploadList={false} action={this.avatarEndpoint}>
							<Button type="primary">Change Avatar</Button>
						</Upload>
						<Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
					</div>
				</Flex>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						initialValues={
							{ 
								'name': name,
								'email': email,
								'username': userName,
								'dateOfBirth': dateOfBirth,
								'phoneNumber': phoneNumber,
								'website': website,
								'address': address,
								'city': city,
								'postcode': postcode
							}
						}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Name"
											name="name"
											rules={[
												{
													required: true,
													message: 'Please input your name!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Username"
											name="username"
											rules={[
												{
													required: true,
													message: 'Please input your username!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Email"
											name="email"
											rules={[{ 
												required: true,
												type: 'email',
												message: 'Please enter a valid email!' 
											}]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Date of Birth"
											name="dateOfBirth"
										>
											<DatePicker className="w-100"/>
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Phone Number"
											name="phoneNumber"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Website"
											name="website"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="Address"
											name="address"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="City"
											name="city"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Post code"
											name="postcode"
										>
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button type="primary" htmlType="submit">
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
					:<Loading/>
				}
			</>
			
		)
	}
}
function mapStateTopProps(state){
    return {users: state.users}
}
function mapDispatchToProps(dispatch){
    return {
        setUsers:(users)=>{
            dispatch(setUsers(users))
        },
        changeUser:(user)=>{
            dispatch(changeUser(user))
        },
    }
}

export default connect(mapStateTopProps,mapDispatchToProps)(EditProfile)
