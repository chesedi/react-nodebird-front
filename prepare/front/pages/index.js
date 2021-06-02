import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { END } from 'redux-saga';

import AppLayout from "../components/AppLayout";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";


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
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('context', context);
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  // next-redux-wrapper doc에 나와 있는 사용법
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
