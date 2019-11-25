import {
  all, call, put,
  takeLeading,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as NewsAPI from '../../apis/news';
import {
  actions as NewsActions,
  NEWS_FETCH_NEWS_LIST,
  NEWS_FETCH_COMMENTS_LIST,
  NEWS_FETCH_REPLY_LIST,
} from '../../reducers/news';

export function* fetchNews() {
  try {
    const { response, error } = yield call(NewsAPI.getNewsIdList);
    if (error) throw error;


    const { data: newsIdList } = response;

    let newsItemList = [];
    for (let i = 0; i < 50; i++) {
      const id = newsIdList[i];
      const { response: newsItemResponse, error: newsItemError } = yield call(NewsAPI.getNewsItem, id);

      if (newsItemError) throw newsItemError;

      const { data: newsItem } = newsItemResponse;
      newsItemList.push(newsItem);
    }

    yield put(NewsActions.fetchNewsListSuccess(newsItemList));
  } catch (error) {
    yield put(NewsActions.fetchNewsListFail(error.message || error));
  }
}

export function* fetchComments({ payload }) {
  try {
    const { commentIdList, newsId } = payload;
    let commentList = [];

    for (let i = 0; i < commentIdList.length; i++) {
      const commentId = commentIdList[i];
      const { response, error } = yield call(NewsAPI.getAllComment, commentId);

      if (error) throw error;

      const { data: commentItem } = response;
      commentList.push(commentItem);
    }

    yield put(NewsActions.fetchCommentListSuccess(commentList));
    yield put(push(`/comments/${newsId}`));
  } catch (error) {
    yield put(NewsActions.fetchCommentListFail(error.message || error));
  }
}

export function* fetchReply({ payload }) {
  try {
    const { replyIdList } = payload;
    let replyList = [];

    for (let i = 0; i < replyIdList.length; i++) {
      const replyId = replyIdList[i];
      const { response, error } = yield call(NewsAPI.getAllReply, replyId);

      if (error) throw error;

      const { data: replyItem } = response;
      replyList.push(replyItem);
    }

    yield put(NewsActions.fetchReplyListSuccess(replyList));
  } catch (error) {
    yield put(NewsActions.fetchReplyListFail(error.message || error));
  }
}

export default function* newsSaga() {
  yield all([
    takeLeading(NEWS_FETCH_NEWS_LIST, fetchNews),
    takeLeading(NEWS_FETCH_COMMENTS_LIST, fetchComments),
    takeLeading(NEWS_FETCH_REPLY_LIST, fetchReply),
  ]);
}
