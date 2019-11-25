import React, { Component } from 'react';
import moment from 'moment';
import _every from 'lodash/every';
import Dashboard from '../../containers/Dashboard';
import {
  CommentsPageWrap,
  CommentItemWrap,
  CommentHead,
  CommentContentWrap,
  CommentLoadMore,
} from './CommentPage.styled';

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => {
    const { fetchCommentList } = this.props;

    fetchCommentList();
  }

  handleFetchReplyList = (replyIdList) => {
    const { fetchReplyList } = this.props;
    fetchReplyList(replyIdList);
  }

  renderReplyItem = (item, index) => {
    const { by, time, text } = item;
    const commentTime = moment.duration(time).humanize();

    return (
      <CommentItemWrap key={index} paddingLeft>
        <CommentHead>
          {`${by} ${commentTime} ago`}
        </CommentHead>
        <CommentContentWrap dangerouslySetInnerHTML={{ __html: text }} />
      </CommentItemWrap>
    )
  }

  renderCommentItem = (item, index) => {
    const { by, time, text, kids = [], } = item;
    const { replyList } = this.props;
    const commentTime = moment.duration(time).humanize();
    const haveReply = _every(replyList, ['parent', item.id]);
    console.log('replyList', !!replyList.length);

    return (
      <CommentItemWrap key={index}>
        <CommentHead>
          {`${by} ${commentTime} ago`}
        </CommentHead>
        <CommentContentWrap dangerouslySetInnerHTML={{ __html: text }} />
        {!!replyList.length && haveReply
          ? replyList.map(this.renderReplyItem)
          : <CommentLoadMore onClick={() => this.handleFetchReplyList(kids)}>Load More</CommentLoadMore>
        }
      </CommentItemWrap>
    )
  }

  render() {
    const { commentList } = this.props;

    return (
      <Dashboard>
        <CommentsPageWrap>
          {commentList.map(this.renderCommentItem)}
        </CommentsPageWrap>
      </Dashboard>
    );
  }
}

export default CommentsPage;