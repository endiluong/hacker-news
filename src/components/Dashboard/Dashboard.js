import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardContainer,
  DashboardTabList,
  DashboardTabItem,
} from './Dashboard.styled';

class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <DashboardTabList>
          <DashboardTabItem>
            <Link to="/">
              News
            </Link>
          </DashboardTabItem>
          <DashboardTabItem>
            <Link to="/favourite">
              Favourite
            </Link>
          </DashboardTabItem>
        </DashboardTabList>

        {this.props.children}
      </DashboardContainer>
    );
  }
}

export default Dashboard;