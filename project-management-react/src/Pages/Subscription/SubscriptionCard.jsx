/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createPayment } from "@/Redux/Payment/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [msgType,setMsgType] = useState();
  const handleUpgrade = () => {
    dispatch(
      createPayment({
        planType: data.planType,
        jwt: localStorage.getItem("jwt"),
      })
    ).then((response)=>{
      if(response?.success)
      {
        setShowSuccessPopup(true);
        setMsgType("success");
      }
      else
      {
        setShowSuccessPopup(true);
        setMsgType("error");
      }
    })
    .catch((error) => {
      console.error("Payment failed", error);
    });
  };
  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
      <p>{data.planName}</p>
      <p>
        <span className="text-xl font-semibold">₹{data.price}/</span>
        <span>{data.planType}</span>
      </p>
      {data.planType == "ANNUAL" && <p className="text-green-500">30% Off</p>}
      <Button onClick={handleUpgrade} className="w-full">{data.buttonName}</Button>
      <div>
        {data.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <CheckCircledIcon />
            <p>{feature}</p>
          </div>
        ))}
      </div>

      {/* Success Popup */}
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful 🎉</DialogTitle>
          </DialogHeader>
          <p>Your payment for the {data.planName} plan was successful.</p>
          <Button onClick={() => setShowSuccessPopup(false)} className="mt-4 w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SubscriptionCard;
