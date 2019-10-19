import * as React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setKeywordFilter } from './stores/filters/actions'

import DetailsPage from './pages/DetailsPage'
import OverviewPage from './pages/OverviewPage'
import ReportsPage from './pages/ReportsPage'
import ReviewPage from './pages/ReviewPage'

import styled, { createGlobalStyle } from 'styled-components'
import DateController from './components/DateController'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: #191e23;
    color: #fff;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 60px;
  padding: 0 10px;
  background: #22272e;
  border-bottom: 1px solid #2c2a46;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.25);
  align-items: center;
`

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  color: #d0d1d2;
`

const WindowMenuList = styled(MenuList)`
  justify-content: flex-end;
`

const MenuItem = styled.li`
  margin: 0 10px;
`

const MenuLink = styled(Link)`
  color: #d0d1d2;
  text-decoration: none;
`

const Main = styled.main`
  padding: 15px;
`

const WrapDateController = styled.div`
  flex: 1;
  margin: 0 20px;
`

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <HashRouter>
          <div>
            <header>
              <Nav>
                <MenuList>
                  <MenuItem className="overview">
                    <MenuLink to="/overview">Overview</MenuLink>
                  </MenuItem>
                  <MenuItem className="review">
                    <MenuLink to="/review">Review</MenuLink>
                  </MenuItem>
                  <MenuItem className="details">
                    <MenuLink to="/details">Details</MenuLink>
                  </MenuItem>
                  <MenuItem className="reports">
                    <MenuLink to="/reports">Reports</MenuLink>
                  </MenuItem>
                </MenuList>

                <WrapDateController>
                  <DateController />
                </WrapDateController>

                <WindowMenuList>
                  <MenuItem>Minimize</MenuItem>
                  <MenuItem>Maximize</MenuItem>
                  <MenuItem>Close</MenuItem>
                </WindowMenuList>
              </Nav>
            </header>

            <Main>
              <Route exact path="/" component={OverviewPage} />
              <Route path="/overview" component={OverviewPage} />
              <Route path="/review" component={ReviewPage} />
              <Route path="/details" component={DetailsPage} />
              <Route path="/reports" component={ReportsPage} />
            </Main>
          </div>
        </HashRouter>
      </React.Fragment>
    )
  }
}

const mapStateToProps  = ({ filters }) => ({
  filters,
})

const dispatchToProps = (dispatch) => bindActionCreators({
  setKeywordFilter,
}, dispatch)

export default connect(
  mapStateToProps,
  dispatchToProps,
)(App)
