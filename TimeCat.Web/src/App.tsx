import * as React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'

import DetailsPage from './pages/DetailsPage'
import OverviewPage from './pages/OverviewPage'
import ReportsPage from './pages/ReportsPage'
import ReviewPage from './pages/ReviewPage'

class App extends React.Component {
    constructor(props: {}) {
        super(props)
    }

    public render() {
        return (
            <HashRouter>
                <div>
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

export default App
