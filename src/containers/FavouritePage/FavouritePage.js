import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _intersectionBy from 'lodash/intersectionBy';
import FavouritePage from '../../components/FavouritePage';
import {
  selectors as NewsSelectors,
  actions as NewsActions,
} from '../../reducers/news';

const mapStateToProps = (state) => {
  const newsItemList = NewsSelectors.getNewsItemList(state);
  const newsWishList = NewsSelectors.getNewsWishList(state);
  const wishList = _intersectionBy(newsItemList, newsWishList, 'id');

  return {
    wishList,
  }
};

const mapDispatchToProps = {
  removeNewsWishList: NewsActions.removeNewsWishList,
  fetchCommentList: NewsActions.fetchCommentList,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FavouritePage),
);