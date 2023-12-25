import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import {setUsers,changeUser} from "redux/actions/Users"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Loading from 'components/shared-components/Loading';

export class UserList extends Component {
 
	state = {
		errors: null,
		loading: true,
		users: this.props.users,
		userProfileVisible: false,
		selectedUser: null
	}
	componentDidMount(){
		if(!this.props.users.length){
			setTimeout(()=>{
				fetch("https://jsonplaceholder.typicode.com/users")
				.then(res=>res.json()).then(result=>{
					const users = result.map(a=>({...a,img:`/img/avatars/thumb-${a.id}.jpg`}))
					this.setState({
						loading:false,
						users
					})
					this.props.setUsers(users)
				})
				.catch(a=>{
					this.setState({
						loading:false,
						errors:a
					})
				})
			}, 1000)			
		}
		else {this.setState({ loading:false, })}
	}
	deleteUser = userId => {
		this.setState({
			users: this.state.users.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	showUserProfile = userInfo => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};
	
	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    });
	}

	render() {
		const { users, userProfileVisible, selectedUser, loading, errors } = this.state;
		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_, record) => (
					<Link to={`${record.id}`}>
						<div className="d-flex">
							<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
						</div>						
					</Link>

				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
  						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Website',
				dataIndex: 'website',
				sorter: {
					compare: (a, b) => {
						if (a.website.toLowerCase() < b.website.toLowerCase()) {
							return -1;
						}
						if (a.website.toLowerCase() > b.website.toLowerCase()) {
							return 1;
						}
						return 0},
				},
			},
			{
				title: 'City',
				dataIndex: 'address',
				render: address => (
					<span>{address.city} </span>
				),
				sorter: {
					compare: (a, b) => {
						if (a.address.city.toLowerCase() < b.address.city.toLowerCase()) {
							return -1;
						}
						if (a.address.city.toLowerCase() > b.address.city.toLowerCase()) {
							return 1;
						}
						return 0},
				}
			},
			{
				title: 'Company',
				dataIndex: 'company',
				render: company => (
					<span>{company.name}</span>
				),
				sorter: {
					compare: (a, b) => {
						if (a.company.name.toLowerCase() < b.company.name.toLowerCase()) {
							return -1;
						}
						if (a.company.name.toLowerCase() > b.company.name.toLowerCase()) {
							return 1;
						}
						return 0},
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];
		return (
			<Card bodyStyle={{'padding': '0px'}}>
				{loading
					? <Loading/>
					:<>
						<Table columns={tableColumns} dataSource={users} rowKey='id' />
						<UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
					</>
				}

			</Card>
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

export default connect(mapStateTopProps,mapDispatchToProps)(UserList)


