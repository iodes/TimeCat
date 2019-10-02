import * as React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import DetailsPage from './pages/DetailsPage'
import OverviewPage from './pages/OverviewPage'
import ReportsPage from './pages/ReportsPage'
import ReviewPage from './pages/ReviewPage'
import { setKeywordFilter } from './stores/filters/actions'
import { IFiltersState } from './stores/filters/types'
import { IRootState } from './stores/index'

interface IProps {
    filters: IFiltersState
    setKeywordFilter: typeof setKeywordFilter
}

class App extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)

        this.onKeywordChange = this.onKeywordChange.bind(this)
    }

    public onKeywordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.setKeywordFilter(e.target.value)
    }

    public render() {
        const { filters } = this.props

        return (
            <HashRouter>
                <div>
                    <header>
                        <input type="text" value={filters.keyword} onChange={this.onKeywordChange} />
                    </header>

                    <aside>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/overview">Overview</Link>
                                </li>
                                <li>
                                    <Link to="/review">Review</Link>
                                </li>
                                <li>
                                    <Link to="/details">Details</Link>
                                </li>
                                <li>
                                    <Link to="/reports">Reports</Link>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <main>
                        <Route exact path="/" component={OverviewPage} />
                        <Route path="/overview" component={OverviewPage} />
                        <Route path="/review" component={ReviewPage} />
                        <Route path="/details" component={DetailsPage} />
                        <Route path="/reports" component={ReportsPage} />
                    </main>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps  = ({ filters }: IRootState) => ({
    filters,
})

const dispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setKeywordFilter,
}, dispatch)

export default connect(
    mapStateToProps,
    dispatchToProps,
)(App)
