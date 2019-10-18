import { Button, Layout, Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import * as React from 'react'
import CategoryList from '../components/CategoryList'
import TimeLine from '../components/Timeline'

import { ITimeline } from '../types/timeline'
import './DetailsPage.css'

interface IProps {
	selectedProject: string
}

interface IState {
	selectedProject: string
	projectRunningTime: string
}

export class DetailsPage extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			selectedProject: 'unassigned',
			projectRunningTime: '9m 50s',
		}
	}

	public render() {
		const dataSource: ITimeline[] = [
			{
				key: 1,
				duration: 8,
				timespan: '21/09/2019..23123123123.',
				detail: 'blabla1',
			},
			{
				key: 2,
				duration: 10,
				timespan: '21/09/2019...',
				detail: 'blabla2',
			},
			{
				key: 3,
				duration: 7,
				timespan: '21/09/2019...',
				detail: 'blabla3',
			},
		]
		function sorter(a: ITimeline, b: ITimeline) {
			return a.duration - b.duration
		}
		const columns: ColumnProps<ITimeline>[] = [
			{
				dataIndex: 'duration',
				key: 'duration',
				sorter,
				width: 50,
				title: 'Duration',
			},
			{
				dataIndex: 'timespan',
				key: 'timespan',
				width: 150,
				title: 'Timespan',
			},
			{
				dataIndex: 'detail',
				key: 'detail',
				title: 'Details',
			},
		]
		const { selectedProject, projectRunningTime } = this.state
		return (
			<Layout className="section">
				<Layout.Header className="header">
					<TimeLine />
				</Layout.Header>
				<Layout>
					<Layout.Sider className="sider">
						<CategoryList />
					</Layout.Sider>
					<Layout className="detail-content">
						<h2>{selectedProject}: {projectRunningTime}</h2>
						<div className="content">
							<div className="detail-page-header">
								<span>Details</span>
								<Button>time</Button>
							</div>
							<Table dataSource={dataSource} columns={columns} />
						</div>
					</Layout>
				</Layout>
			</Layout>
		)
	}
}

export default DetailsPage
