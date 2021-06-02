import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { END } from 'redux-saga';

import AppLayout from "../components/AppLayout";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from 'axios';


const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(()=> {
    function onScroll(){
      // scrollY : 얼마나 내렸는지
      // clientHeight : 화면 보이는 길이
      // scrollHeihgt: 총 길이
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
        if(hasMorePosts && !loadPostsLoading){
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post}/> )}
    </AppLayout>
  );
};

// 서버 쪽에서 화면 그리기 전에 먼저 실행함
// 실행 결과를 HYDRATE로 보내줌
// 프론트 서버에서만 실행되는 영역
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // 주의해야 할 부분(why? 서버 자원은 모두의 자원이기 때문에)
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  console.log('context', context);
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  // next-redux-wrapper doc에 나와 있는 사용법
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
