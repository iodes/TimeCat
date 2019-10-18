import * as React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { setKeywordFilter } from './stores/filters/actions'
import { IFiltersState } from './stores/filters/types'
import { IRootState } from './stores/index'

import DetailsPage from './pages/DetailsPage'
import OverviewPage from './pages/OverviewPage'
import ReportsPage from './pages/ReportsPage'
import ReviewPage from './pages/ReviewPage'

import styled, { createGlobalStyle } from 'styled-components'

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
  height: 50px;
  padding: 0 10px;
  background: #22272e;
  border-bottom: 1px solid #2c2a46;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.25);
  justify-content: space-between;
`

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  height: 50px;
  list-style: none;
  padding: 0;
  margin: 0;
  line-height: 50px;
`

const MenuItem = styled.li`
  margin: 0 10px;
`

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const Main = styled.main`
  padding: 15px;
`

interface IProps {
  filters: IFiltersState
  setKeywordFilter: typeof setKeywordFilter
}

class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  public render() {
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

                <MenuList>
                  <MenuItem>Minimize</MenuItem>
                  <MenuItem>Maximize</MenuItem>
                  <MenuItem>Close</MenuItem>
                </MenuList>
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
