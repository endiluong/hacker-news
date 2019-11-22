import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewsPage from '../../components/NewsPage';
import {
  selectors as NewsSelectors,
  actions as NewsActions,
} from '../../reducers/news';

const mapStateToProps = (state) => ({
  newsItemList: NewsSelectors.getNewsItemList(state),
  newsWishList: NewsSelectors.getNewsWishList(state),
});

const mapDispatchToProps = {
  fetchNewsList: NewsActions.fetchNewsList,
  addNewsWishList: NewsActions.addNewsWishList,
  removeNewsWishList: NewsActions.removeNewsWishList,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewsPage),
);