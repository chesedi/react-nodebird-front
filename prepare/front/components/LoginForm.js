import React, { useCallback, useMemo, useState } from 'react'
import { Button, Form, Input } from 'antd'
import Link from "next/link";
import styled from 'styled-components'
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequstAction } from '../reducers/user'

const ButtonWrapper = styled.div`
  margin-top: 10px
`;

const FormWrapper = styled(Form)`
  padding: 10px
`;


const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm =  useCallback(() => {
    console.log(id, password);
    dispatch(loginRequstAction({email, password}));
  }, [email, password]);


  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br/>
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br/>
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
        <Link href="/signup"><a><button>회원가입</button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}

export default LoginForm
