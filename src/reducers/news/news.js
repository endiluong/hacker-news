// action definition
export const NEWS_FETCH_NEWS_LIST = 'news/NEWS_FETCH_NEWS_LIST';
export const NEWS_FETCH_NEWS_LIST_SUCCESS = 'news/NEWS_FETCH_NEWS_LIST_SUCCESS';
export const NEWS_FETCH_NEWS_LIST_FAIL = 'news/NEWS_FETCH_NEWS_LIST_FAIL';

export const NEWS_FETCH_COMMENTS_LIST = 'news/NEWS_FETCH_COMMENTS_LIST';
export const NEWS_FETCH_COMMENTS_LIST_SUCCESS = 'news/NEWS_FETCH_COMMENTS_LIST_SUCCESS';
export const NEWS_FETCH_COMMENTS_LIST_FAIL = 'news/NEWS_FETCH_COMMENTS_LIST_FAIL';

export const NEWS_FETCH_REPLY_LIST = 'news/NEWS_FETCH_REPLY_LIST';
export const NEWS_FETCH_REPLY_LIST_SUCCESS = 'news/NEWS_FETCH_REPLY_LIST_SUCCESS';
export const NEWS_FETCH_REPLY_LIST_FAIL = 'news/NEWS_FETCH_REPLY_LIST_FAIL';

export const NEWS_ADD_WISH_LIST = 'news/NEWS_ADD_WISH_LIST';
export const NEWS_REMOVE_WISH_LIST = 'news/NEWS_REMOVE_WISH_LIST';

// selectors
export const getNewsItemList = ({ news }) => news.newsItemList;
export const getNewsWishList = ({ news }) => news.newsWishList;
export const getCommentList = ({ news }) => news.commentList;
export const getReplyList = ({ news }) => news.replyList;
export const isNewsLoading = ({ news }) => news.isLoading;

export const selectors = {
  getNewsItemList,
  getNewsWishList,
  getCommentList,
  getReplyList,

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

export const fetchCommentList = (commentIdList, newsId) => ({
  type: NEWS_FETCH_COMMENTS_LIST,
  payload: {
    commentIdList,
    newsId,
  }
});

export const fetchCommentListSuccess = commentList => ({
  type: NEWS_FETCH_COMMENTS_LIST_SUCCESS,
  payload: {
    commentList,
  },
});

export const fetchCommentListFail = errorMsg => ({
  type: NEWS_FETCH_COMMENTS_LIST_FAIL,
  payload: {
    errorMsg,
  },
});

export const fetchReplyList = (replyIdList) => ({
  type: NEWS_FETCH_REPLY_LIST,
  payload: {
    replyIdList,
  }
});

export const fetchReplyListSuccess = replyList => ({
  type: NEWS_FETCH_REPLY_LIST_SUCCESS,
  payload: {
    replyList,
  },
});

export const fetchReplyListFail = errorMsg => ({
  type: NEWS_FETCH_REPLY_LIST_FAIL,
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

export const removeNewsWishList = newsId => ({
  type: NEWS_REMOVE_WISH_LIST,
  payload: {
    newsId,
  },
});

export const actions = {
  fetchNewsList,
  fetchNewsListSuccess,
  fetchNewsListFail,

  fetchCommentList,
  fetchCommentListSuccess,
  fetchCommentListFail,

  fetchReplyList,
  fetchReplyListSuccess,
  fetchReplyListFail,

  addNewsWishList,
  removeNewsWishList,
};

// reducers

const initialState = {
  newsItemList: [],
  isLoading: null,
  errorMsg: null,

  newsWishList: [],
  commentList: [],
  replyList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEWS_FETCH_NEWS_LIST: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
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
      const newsSelected = {
        id: newsId,
        moved: false,
      };
      return {
        ...state,
        newsWishList: [
          ...newsWishList,
          newsSelected,
        ],
      };
    }

    case NEWS_REMOVE_WISH_LIST: {
      const { newsId } = action.payload;
      const { newsWishList } = state;
      const newsSelected = newsWishList.filter(wl => wl.id !== newsId);

      return {
        ...state,
        newsWishList: newsSelected,
      };
    }

    case NEWS_FETCH_COMMENTS_LIST: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    }

    case NEWS_FETCH_COMMENTS_LIST_SUCCESS: {
      const { commentList } = action.payload;
      return {
        ...state,
        isLoading: false,
        commentList,
      };
    }

    case NEWS_FETCH_COMMENTS_LIST_FAIL: {
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    }

    case NEWS_FETCH_REPLY_LIST: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    }

    case NEWS_FETCH_REPLY_LIST_SUCCESS: {
      const { replyList } = action.payload;
      return {
        ...state,
        isLoading: false,
        replyList,
      };
    }

    case NEWS_FETCH_REPLY_LIST_FAIL: {
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    }

    default: {
      return state;
    }
  }
}
