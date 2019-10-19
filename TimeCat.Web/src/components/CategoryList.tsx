import * as React from 'react'
import CategoryItem from './CategoryItem'
import { AntTreeNodeSelectedEvent } from 'antd/es/tree'
import { Tree } from 'antd'
import { AntTreeNodeDropEvent } from 'antd/es/tree/Tree'
import { AntTreeNodeDragEnterEvent } from 'antd/lib/tree/Tree'

const { TreeNode, DirectoryTree } = Tree

interface IGData {
	key: string
	title: string
	children: IGData[]
}

interface IProps {
	category: number[]
}

interface IState {
	gData: IGData[]
	expandedKeys: string[]
}

const x = 3
const y = 2
const z = 1
const gData: IGData[] = []

// tslint:disable-next-line:variable-name
const generateData = (_level: number, _preKey?: string, _tns?: IGData[]) => {
	const preKey = _preKey || '0'
	const tns = _tns || gData

	const children = []
	for (let i = 0; i < x; i++) {
		const key = `${preKey}-${i}`
		tns.push({ title: key, key, children: [] })
		if (i < y) {
			children.push(key)
		}
	}
	if (_level < 0) {
		return tns
	}
	const level = _level - 1
	children.forEach((key, index) => {
		tns[index].children = []
		return generateData(level, key, tns[index].children)
	})
}
generateData(z)
export class CategoryList extends React.Component<{}, IState> {
	public state = {
		gData,
		expandedKeys: [],
	}

	constructor(props: {}) {
		super(props)
	}

	public onDragEnter = (info: AntTreeNodeDragEnterEvent) => {
		// tslint:disable-next-line:no-console
		console.log(info)
		// expandedKeys 需要受控时设置
		this.setState({
			expandedKeys: info.expandedKeys,
		})
	}

	public onDrop = (info: AntTreeNodeDropEvent) => {
		// tslint:disable-next-line:no-console
		console.log(info)
		const dropKey = info.node.props.eventKey || ''
		const dragKey = info.dragNode.props.eventKey || ''
		const dropPos = info.node.props.pos.split('-')
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

		// tslint:disable-next-line:no-shadowed-variable
		const loop = (data: IGData[], key: string, callback: any) => {
			data.forEach((item, index, arr) => {
				if (item.key === key) {
					return callback(item, index, arr)
				}
				if (item.children) {
					return loop(item.children, key, callback)
				}
			})
		}
		const data = [...this.state.gData]

		// Find dragObject
		let dragObj: any
		loop(data, dragKey, (item: IGData, index: number, arr: IGData[]) => {
			arr.splice(index, 1)
			dragObj = item
		})

		if (!info.dropToGap) {
			// Drop on the content
			loop(data, dropKey, (item: IGData) => {
				item.children = item.children || []
				// where to insert 示例添加到尾部，可以是随意位置
				item.children.push(dragObj)
			})
		} else if (
			((info.node.props.children || []) as React.ReactNodeArray).length > 0 && // Has children
			info.node.props.expanded && // Is expanded
			dropPosition === 1 // On the bottom gap
		) {
			loop(data, dropKey, (item: IGData) => {
				item.children = item.children || []
				// where to insert 示例添加到尾部，可以是随意位置
				item.children.unshift(dragObj)
			})
		} else {
			let ar: any
			let i: number = 0
			loop(data, dropKey, (item: IGData, index: number, arr: IGData[]) => {
				ar = arr
				i = index
			})
			if (dropPosition === -1) {
				ar.splice(i, 0, dragObj)
			} else {
				ar.splice(i + 1, 0, dragObj)
			}
		}

		this.setState({
			gData: data,
		})
	}

	public render() {
		const loop: (data: IGData[]) => JSX.Element[] = (data) =>
			data.map((item: IGData) => {
				if (item.children && item.children.length) {
					return (
						<TreeNode key={item.key} title={item.title}>
							{loop(item.children)}
						</TreeNode>
					)
				}
				return <TreeNode key={item.key} title={item.title} isLeaf />
			})

		return (
			<div>
				<h4>projects</h4>
				<div className="category-wrapper">
					<DirectoryTree
						className="draggable-tree"
						defaultExpandedKeys={this.state.expandedKeys}
						draggable
						blockNode
						onDragEnter={this.onDragEnter}
						onDrop={this.onDrop}
					>
						{loop(this.state.gData)}
					</DirectoryTree>
				</div>
			</div>
		)
	}
}

export default CategoryList
