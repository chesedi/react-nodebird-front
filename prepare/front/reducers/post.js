
import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

const initialState = {
  mainPosts: [{
    id: 1,
    User : {
      id: 1,
      nickname: '제로초'
    },
    content: '첫번쨰 게시글 #해시태그 #익스프레스',
    Images : [{
      src : 'data:image/jpeg;base64,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'
    }, {
      src : 'data:image/png;base64,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'
    }, {
      src : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0XiinDtbqzfRqo6MlJyEO2fRkXO9S3fG21w&usqp=CAU'
    }],
    Comments: [{
      User : {
        nickname: 'nero'
      },
      content: '우와 개정판'
    }, {
      User : {
        nickname: 'hero'
      },
      content: '우와 개정판2222'
    }]
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20).fill().map((v, i) => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      src: faker.image.image(),
    }],
    Comments: [{
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
  })),
);


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
}

export default reducer;