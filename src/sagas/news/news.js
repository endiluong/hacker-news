import {
  all, call, put,
  takeLeading,
} from 'redux-saga/effects';
import * as NewsAPI from '../../apis/news';
import {
  actions as NewsActions,
  NEWS_FETCH_NEWS_LIST,
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
    yield put(NewsActions.fetchNewsListFailed(error.message || error));
  }
}

export default function* newsSaga() {
  yield all([
    takeLeading(NEWS_FETCH_NEWS_LIST, fetchNews),
  ]);
}
