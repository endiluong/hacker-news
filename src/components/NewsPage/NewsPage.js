import React, { Component } from 'react';
import moment from 'moment';
import Dashboard from '../../containers/Dashboard';
import { success as ToastSuccess } from '../../utils/toast';
import {
  NewsPageContainer,
  NewsItemWrap,
  NewsItemContentWrap,
  NewsTitle,
  NewsActionWrap,
  NewsPoint,
  NewsAuthor,
  NewsTime,
  NewsComment,
  NewsWishlist,
} from './NewsPage.syled';

class NewsPage extends Component {
  componentDidMount = () => {
    const { fetchNewsList } = this.props;
    fetchNewsList();
  }

  handleWishList = (newsId) => {
    const { addNewsWishList, newsWishList } = this.props;
    addNewsWishList(newsId);

    if (newsWishList[newsId] && newsWishList[newsId].moved) {
      ToastSuccess('This news has been removed successfully');
    } else {
      ToastSuccess('This news has been moved successfully');
      
    }
  }

  renderNewsItem = (items, index) => {
    const { title, score, by: author, url, time, kids = [] } = items;
    const { newsWishList } = this.props;
    const displayComment = kids.length > 1 ? 'comments' : 'comment';
    const newsTime = moment.duration(time).humanize();

    return (
      <NewsItemWrap key={index}>
        <span>{index + 1}</span>
        <NewsItemContentWrap>
          <NewsTitle href={url || ''}>{title}</NewsTitle>
          <NewsActionWrap>
            <NewsPoint>{`${score} points`}</NewsPoint>
            <NewsAuthor>{`by ${author}`}</NewsAuthor>
            <NewsTime>{` - ${newsTime} - `}</NewsTime>
            <NewsComment>{`${kids.length || '0'} ${displayComment}`}</NewsComment>
            <NewsPoint>{` - `}</NewsPoint>
            <NewsWishlist
              isWishList={!!(newsWishList[items.id] || {}).moved}
              onClick={() => this.handleWishList(items.id)}
            >
              &#10084;
            </NewsWishlist>
          </NewsActionWrap>
        </NewsItemContentWrap>
      </NewsItemWrap>
    )
  }

  render() {
    const { newsItemList, newsWishList } = this.props;
    return (
      <Dashboard>
        <NewsPageContainer>
          {newsItemList.map(this.renderNewsItem)}
        </NewsPageContainer>
      </Dashboard>
    );
  }
}

export default NewsPage;