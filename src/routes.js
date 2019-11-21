import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import MainLayout from './components/MainLayout';
import Dashboard from './containers/Dashboard';
import NewsPage from './containers/NewsPage';

class Router extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <MainLayout>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/news" component={NewsPage} />
          </Switch>
        </MainLayout>
      </Switch>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Router);
