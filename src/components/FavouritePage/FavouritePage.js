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
  NewsSearchWrap,
} from '../NewsPage/NewsPage.syled';

class FavouritePage extends Component {
  constructor(props) {
    super(props);
    const { wishList } = this.props;
    this.state = {
      wishListFilter: wishList,
    }
  }

  componentDidMount() {
    const { wishList } = this.props;

    this.setState({
      wishListFilter: wishList
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wishListFilter: nextProps.wishList
    });
  }

  handleDeleteWishlist = (newsId) => {
    const { removeNewsWishList } = this.props;
    removeNewsWishList(newsId);
    ToastSuccess('This news has been deleted successfully');
  }

  handleChange = (e) => {
    let newWishList = [];
    const { wishList } = this.props;

    if (e.target.value !== '') {
      newWishList = wishList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newWishList = wishList
    }

    this.setState({
      wishListFilter: newWishList,
    });
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
            <NewsTime>{` - ${newsTime} ago - `}</NewsTime>
            <NewsComment>{`${kids.length || '0'} ${displayComment}`}</NewsComment>
          </NewsActionWrap>
        </NewsItemContentWrap>

        <NewsDeleteButton onClick={() => this.handleDeleteWishlist(items.id)}>
          &#10005;
        </NewsDeleteButton>
      </NewsItemWrap>
    )
  }

  render() {
    const { wishListFilter } = this.state;

    return (
      <Dashboard>
        <NewsSearchWrap>
          <input type='text' placeholder='Search news ...' onChange={this.handleChange} />
        </NewsSearchWrap>

        <NewsPageContainer>
          {wishListFilter.map(this.renderNewsItem)}
        </NewsPageContainer>
      </Dashboard>
    );
  }
}

export default FavouritePage;