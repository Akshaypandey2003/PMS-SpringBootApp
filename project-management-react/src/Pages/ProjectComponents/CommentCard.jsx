/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { deleteComment, fetchComments } from '@/Redux/Comment/Action'
import { TrashIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export const CommentCard = ({item}) => {

    // console.log("Inside comment card:------->",item)
    const dispatch = useDispatch();

    const handleCommentDelete = ()=>{
        dispatch(deleteComment(item.id)).then(()=>dispatch(fetchComments(item?.issue?.id)))
    }

  return (
    <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarFallback className="bg-gray-950 font-sans">{item.user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p className='font-sans'>{item.user?.name}</p>
                <p className='font-sans'>  {item.content}</p>

            </div>
        </div>
        <Button onClick={handleCommentDelete} className="rounded-full border-none" variant="ghost" size = "icon">
            <TrashIcon></TrashIcon>
        </Button>
    </div>
  )
}
export default CommentCard;
