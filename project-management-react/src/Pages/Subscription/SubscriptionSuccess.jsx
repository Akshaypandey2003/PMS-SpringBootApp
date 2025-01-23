/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getUserSubscription, upgradeSubscription } from '@/Redux/Subscription/Action'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const SubscriptionSuccess = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {subscription} = useSelector(store=>store);
    const queryParams = new URLSearchParams(location.search);
    //This payment_id will be set automatically by RazorPay we do not need to pass it from the backend.
    const paymentId = queryParams.get("payment_id");

    // This planType is comming from backend    
    const planType = queryParams.get("planType");

    useEffect(() => {
      dispatch(upgradeSubscription(planType)).then(() => {
          dispatch(getUserSubscription(localStorage.getItem("jwt")));
      });
  }, []);
  return (
    <div className='flex justify-center border h-[90vh] home-background'>
        <Card className="mt-10 space-y-5 flex  flex-col items-center bg-black p-10 h-[50%] w-[50%]">
           <div className='flex items-center gap-4'>
            <CheckCircledIcon className='h-9 w-9 text-green-500'>
                <p className='text-xl'>Plan Upgraded Successfully</p>
            </CheckCircledIcon>
           </div>
           <div className='space-y-3'>
            <p className='text-green-500'>Start date: {subscription.userSubscription?.subscriptionStartDate}</p>
            <p className='text-red-500'>End date:  {subscription.userSubscription?.subscriptionEndDate}</p>
            <p className=''>Plan Type:  {subscription.userSubscription?.planType}</p>
           </div>
           <Button onClick={()=>navigate("/home")}>Home</Button>
        </Card>
    </div>
  )
}
