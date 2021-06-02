import { Rate } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notifiSuccess } from '../../../../../common/notification'
import { UserInterface } from '../../../../../interface/user.interface'
import { COMMENT_URL } from '../../../../../share/common/api/api-constants'
import { CREATE_COMMENT } from '../../../../../store/actions/comment.action'
import { AppState } from '../../../../../store/types'

type CommentProps = {
  author?: string
  body?: string
  createOn?: Date | unknown
  productId?: string
  value?: number
  productName?: string
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

export default function FormComment({ productId, productName }: CommentProps) {
  const timeStamp = new Date().toLocaleString().replace(',', '').replace(/:.. /, ' ')
  const user = useSelector<AppState, UserInterface>((state) => state.auth.user)

  const dispatch = useDispatch()
  const [comment, setComment] = useState<CommentProps>()
  const handleOnChangeValue = (event: any) => {
    setComment({ ...comment, [event.target.name]: event.target.value })
  }

  const handleOnChange = (value: number) => {
    setComment({ ...comment, value: value })
  }

  const handleOnSubmit = (event: any) => {
    event.preventDefault()
    const newComment = {
      productId: productId,
      author: user.name,
      body: comment?.body,
      createOn: timeStamp,
      value: comment?.value,
      userId: user.userId
    }
    return fetch(COMMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newComment)
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({ type: CREATE_COMMENT, payload: newComment })
        setComment({ body: '', value: 3 })
        notifiSuccess('Success', 'Comment add success')
      })
  }

  return (
    <form className='comment-form' onSubmit={handleOnSubmit}>
      <div className='comment-form-fields'>
        <h5 style={{ fontWeight: 'bold' }}>Đánh giá của bạn *</h5>
        <Rate allowHalf tooltips={desc} onChange={handleOnChange} value={comment?.value} />
        {comment?.value ? <span className='ant-rate-text'>{desc[comment?.value - 1]}</span> : ''}
        <br />
        <h5 style={{ fontWeight: 'bold' }}>Nhận xét của bạn *</h5>
        <textarea
          placeholder='Nhập nhận xét của bạn'
          name='body'
          value={comment?.body}
          onChange={handleOnChangeValue}
          required={true}
          style={{ width: '100%', border: '1px solid red' }}
          rows={4}></textarea>
      </div>
      <div className='comment-form-actions'>
        <button className='button button-add is-danger' type='submit'>
          Add Comment
        </button>
      </div>
    </form>
  )
}
