import { Button, Form, Input } from "antd"
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput"
import { ADD_COMMENT_REQUEST } from '../reducers/post'

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [commentText, onChnageCommentText, setCommentText] = useInput('')

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }

  }, [addCommentDone])

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id},
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0}}>
        <Input.TextArea
          value={commentText}
          onChange={onChnageCommentText}
          rows={4}
        />
        <Button style={{ position: 'absolute', right: 0, bottom: -40}} type="primary" htmlType="submit">삐약</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.prototype = {
  post: PropTypes.object.isRequired,
};


export default CommentForm
