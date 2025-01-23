/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { acceptInvitation, fetchProjects } from '@/Redux/Project/Action';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

export const AcceptInvitationPage = () => {

    const location = useLocation();
    const dispatch = useDispatch();
  
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const token  = urlParams.get('token');


    const handleAcceptInvitation = ()=>{
          dispatch(acceptInvitation({token,navigate})).then(()=>dispatch(fetchProjects({})));
    }
  return (
    <div className='h-[85vh] flex flex-col justify-center items-center'>
         <h1 className='py-5 font-semibold text-xl'>You are invited to join the project</h1>
         <Button onClick={handleAcceptInvitation}> Accept Invitation</Button>
    </div>
  )
}
