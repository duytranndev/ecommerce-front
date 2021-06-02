import { Avatar, Comment, Rate } from 'antd'
import { CommentInterface } from '../../../../../interface/comment.interface'

type CommentListProps = {
  comments: CommentInterface[] | undefined
}

export default function CommentList({ comments }: CommentListProps): JSX.Element {
  return (
    <>
      {comments?.map((item, index) => {
        return (
          <div style={{ display: 'flex' }}>
            <Comment
              key={item.createOn as string}
              author={<a>{item.author}</a>}
              avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' alt='Han Solo' />}
              content={<p>{item.body}</p>}
              datetime={item.createOn as string}
            />
            <Rate allowHalf disabled defaultValue={item.value} style={{ fontSize: '1em', paddingTop: '10px' }} />
          </div>
        )
      })}
    </>
  )
}
