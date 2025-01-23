import api from "@/Config/api"

/* eslint-disable no-unused-vars */
export const createPayment=async({planType,jwt})=>{

    try {
         const {data} = await api.post(`api/payment/${planType}`)
         if(data.paymentLinkUrl)
         {
            window.location.href=data.paymentLinkUrl;
            return Promise.resolve({ success: true, paymentLink: data.paymentLinkUrl });
         }
    } catch (error) {
        console.error("Payment error:", error.message);
        return Promise.reject(error);
    }
}