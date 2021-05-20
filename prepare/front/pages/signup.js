import React, { useCallback, useState } from "react";
import Head from "next/head";
import { Checkbox, Form, Input, Button } from "antd";
import styled from 'styled-components'

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

const ErrorMessage = styled.div`
  color: red;
`;


const Signup = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.value);
    setTermError(false);
  },[]);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if(!term){
      return setTermError(true);
    }
    console.log(email, nickname, password);
   },[password, passwordCheck, term]);

  return (
      <AppLayout>
        <Head>
          <title>회원가입 | NodeBird</title>
        </Head>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>제로초 말을 잘 들을 것을 동이합니다.</Checkbox>
            {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">가입하기</Button>
          </div>
        </Form>
      </AppLayout>
    );
};

export default Signup;
