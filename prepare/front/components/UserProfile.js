import React, { useCallback } from 'react'
import { Avatar, Button, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequstAction } from '../reducers/user'

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state)=> state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequstAction())
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">짹짹<br />{me.Posts.length}</div>,
        <div key="followings">{me.Followings.length}<br />0</div>,
        <div key="followings">{me.Followers.length}<br />0</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
