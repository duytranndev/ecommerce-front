import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAPIGlobal } from '../../../../api/get_products'
import { CommentInterface } from '../../../../interface/comment.interface'
import { COMMENT_URL_BY_ID } from '../../../../share/common/api/api-constants'
import { AppState } from '../../../../store/types'
import FormComment from './form-comment'
import CommentList from './list-comment'

export default function Comment(props: any) {
  const commentList = useSelector<AppState, CommentInterface[] | undefined>((state) => state.comment.list)
  const localStorageKey = 'userLogged'
  let user = localStorage.getItem(localStorageKey)
  const { isLogged } = useSelector((state: any) => state.authUser)

  const dispatch = useDispatch()

  useEffect(() => {}, [isLogged])

  useEffect(() => {
    props.productId &&
      getAPIGlobal(COMMENT_URL_BY_ID, props.productId).then((res) => {
        dispatch({ type: 'GET_COMMENT', payload: res?.data.data })
      })
  }, [props.productId])
  return (
    <>
      {commentList?.length === 0 ? (
        <>
          {user === null ? (
            <>
              <h5>Chưa có đánh giá nào</h5>
              <div className='form-comment'>
                <h1>Hãy là người đầu tiên nhận xét "{props.productName}"</h1>
                <h5>
                  Bạn phải <Link to=''>đăng nhập</Link> để gửi đánh giá
                </h5>
              </div>
            </>
          ) : (
            <>
              <h5>Chưa có đánh giá nào</h5>
              <div className='form-comment'>
                <h1>Hãy là người đầu tiên nhận xét "{props.productName}"</h1>
                <FormComment productId={props.productId} productName={props.productName} />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {user === null ? (
            <>
              <CommentList comments={commentList} />
              <div className='form-comment'>
                <h1>Nhận xét về sản phẩm"{props.productName}"</h1>
                <h6>Bạn phải đăng nhập để gửi đánh giá</h6>
              </div>
            </>
          ) : (
            <>
              <CommentList comments={commentList} />
              <div className='form-comment'>
                <h1>Nhận xét về sản phẩm"{props.productName}"</h1>
                <FormComment productId={props.productId} productName={props.productName} />
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
