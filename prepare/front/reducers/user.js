
export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {}
}


const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';


export const loginRequstAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const loginSuccessAction = (data) => ({
  type: LOG_IN_SUCCESST,
  data,
});

export const loginFailureAction = (data) => ({
  type: LOG_IN_FAILUARE,
  data,
});

export const logoutRequstAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const logoutSuccessAction = () => ({
  type: LOG_OUT_SUCCESS,
});

export const logoutFailureAction = () => ({
  type: LOG_OUT_FAILUARE,
});


const reducer = (state = initialState, action) => {
  switch(action.type){
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        me: action.data
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        me: null
      };
    default:
      return state;
  }
}

export default reducer;

