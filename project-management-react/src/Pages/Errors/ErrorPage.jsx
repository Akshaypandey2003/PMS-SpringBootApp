/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <div className=' home-background h-[90vh] p-10'> 
        <div className=' flex  flex-col  gap-y-4 m-auto items-center p-5 text-wrap'>
          <h1 className='font-mono text-black text-5xl'>Opps Something went wrong !! Please try Again </h1>
          <Button onClick={()=>navigate("/home") } className="bg-black w-28 p-2 font-sans hover:bg-gray-950" variant="ghost">Go  to Home</Button>
        </div>

    </div>
  )
}
export default ErrorPage;