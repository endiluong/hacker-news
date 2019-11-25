import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import MainLayout from './components/MainLayout';
import NewsPage from './containers/NewsPage';
import FavouritePage from './containers/FavouritePage';
import CommentsPage from './containers/CommentsPage';

class Router extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <MainLayout>
          <Switch>
            <Route exact path="/" component={NewsPage} />
            <Route exact path="/favourite" component={FavouritePage} />
            <Route exact path="/comments/:id" component={CommentsPage} />
          </Switch>
        </MainLayout>
      </Switch>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Router);
