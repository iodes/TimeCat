import * as React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setKeywordFilter } from './stores/filters/actions';

import DetailsPage from './pages/DetailsPage';
import OverviewPage from './pages/OverviewPage';
import ReportsPage from './pages/ReportsPage';
import ReviewPage from './pages/ReviewPage';

import DateController from './components/DateController';

import './assets/styles/App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <React.Fragment>
            <header id="header">
              <nav>
                <ul className="tabs">
                  <li className="overview">
                    <Link to="/overview">Overview</Link>
                  </li>
                  {/*<li className="review">*/}
                    {/*<Link to="/review">Review</Link>*/}
                  {/*</li>*/}
                  <li className="details">
                    <Link to="/details">Details</Link>
                  </li>
                  <li className="reports">
                    <Link to="/reports">Reports</Link>
                  </li>
                </ul>

                <div className="date-controller">
                  <DateController />
                </div>

                <ul className="window-menu">
                  <li className="minimize">
                    <button type="button">Minimize</button>
                  </li>
                  <li className="maximize">
                    <button type="button">Maximize</button>
                  </li>
                  <li className="close">
                    <button type="button">Close</button>
                  </li>
                </ul>
              </nav>
            </header>

            <main id="main">
              <Route exact path="/" component={OverviewPage} />
              <Route path="/overview" component={OverviewPage} />
              <Route path="/review" component={ReviewPage} />
              <Route path="/details" component={DetailsPage} />
              <Route path="/reports" component={ReportsPage} />
            </main>
          </React.Fragment>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps  = ({ filters }) => ({
  filters,
});

const dispatchToProps = (dispatch) => bindActionCreators({
  setKeywordFilter,
}, dispatch);

export default connect(
  mapStateToProps,
  dispatchToProps,
)(App);
