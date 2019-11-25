import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentsPage from '../../components/CommentsPage';
import {
  selectors as NewsSelectors,
  actions as NewsActions,
} from '../../reducers/news';

const mapStateToProps = (state) => ({
  commentList: NewsSelectors.getCommentList(state),
  replyList: NewsSelectors.getReplyList(state),
});

const mapDispatchToProps = {
  fetchCommentList: NewsActions.fetchCommentList,
  fetchReplyList: NewsActions.fetchReplyList,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CommentsPage),
);