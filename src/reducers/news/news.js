// action definition

export const NEWS_FETCH_NEWS_LIST = 'news/NEWS_FETCH_NEWS_LIST';
export const NEWS_FETCH_NEWS_LIST_SUCCESS = 'news/NEWS_FETCH_NEWS_LIST_SUCCESS';
export const NEWS_FETCH_NEWS_LIST_FAIL = 'news/NEWS_FETCH_NEWS_LIST_FAIL';

export const NEWS_ADD_WISH_LIST = 'news/NEWS_ADD_WISH_LIST';

// selectors
export const getNewsItemList = ({ news }) => news.newsItemList;
export const getNewsWishList = ({ news }) => news.newsWishList;
export const isNewsLoading = ({ news }) => news.isLoading;

export const selectors = {
  getNewsItemList,
  getNewsWishList,

  isNewsLoading,
};

// action creators
export const fetchNewsList = () => ({
  type: NEWS_FETCH_NEWS_LIST,
});

export const fetchNewsListSuccess = newsItemList => ({
  type: NEWS_FETCH_NEWS_LIST_SUCCESS,
  payload: {
    newsItemList,
  },
});

export const fetchNewsListFail = errorMsg => ({
  type: NEWS_FETCH_NEWS_LIST_FAIL,
  payload: {
    errorMsg,
  },
});

export const addNewsWishList = newsId => ({
  type: NEWS_ADD_WISH_LIST,
  payload: {
    newsId,
  },
});

export const actions = {
  fetchNewsList,
  fetchNewsListSuccess,
  fetchNewsListFail,

  addNewsWishList,
};

// reducers

const initialState = {
  newsItemList: [],
  isLoading: null,
  errorMsg: null,

  newsWishList: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEWS_FETCH_NEWS_LIST: {
      return {
        ...state,
        isLoading: true,
        errorMsg: false,
      };
    }

    case NEWS_FETCH_NEWS_LIST_SUCCESS: {
      const { newsItemList } = action.payload;
      return {
        ...state,
        isLoading: false,
        newsItemList,
      };
    }

    case NEWS_FETCH_NEWS_LIST_FAIL: {
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    }

    case NEWS_ADD_WISH_LIST: {
      const { newsId } = action.payload;
      const { newsWishList } = state;
      const newsSelected = newsWishList[newsId] || {
        id: newsId,
        moved: false,
      };
      return {
        ...state,
        newsWishList: {
          ...newsWishList,
          [newsId]: {
            ...newsSelected,
            moved: !newsSelected.moved,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}
