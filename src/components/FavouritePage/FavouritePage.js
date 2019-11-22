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
  NewsDeleteButton,
} from '../NewsPage/NewsPage.syled';

class FavouritePage extends Component {
  handleDeleteWishlist = (newsId) => {
    const { removeNewsWishList } = this.props;
    removeNewsWishList(newsId);
    ToastSuccess('This news has been deleted successfully');
  }

  renderNewsItem = (items, index) => {
    const { title, score, by: author, url, time, kids = [] } = items;
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

          </NewsActionWrap>
        </NewsItemContentWrap>

        <NewsDeleteButton onClick={() => this.handleDeleteWishlist(items.id)}>
          &#10005;
        </NewsDeleteButton>
      </NewsItemWrap>
    )
  }

  render() {
    const { wishList } = this.props;

    return (
      <Dashboard>
        <NewsPageContainer>
          {wishList.map(this.renderNewsItem)}
        </NewsPageContainer>
      </Dashboard>
    );
  }
}

export default FavouritePage;