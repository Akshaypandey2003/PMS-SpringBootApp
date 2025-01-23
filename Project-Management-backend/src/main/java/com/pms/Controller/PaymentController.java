package com.pms.Controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pms.Entities.PlanType;
import com.pms.Entities.User;
import com.pms.Response.PaymentLinkResponse;
import com.pms.Services.UserService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/api/payment")  
public class PaymentController {
    
    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String secretKey;

    @Autowired
    private UserService userService;

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> creatPaymentLink(
        @PathVariable PlanType planType,
        @RequestHeader("Authorization") String jwtToken
    )throws Exception
    {
        User user = userService.findUserProfileByJwt(jwtToken);
        int amount = 199*100;

        if(planType.equals(PlanType.ANNUALLY))
        {
            amount = amount*12;
            amount -= (amount*30)/100;
        }
        try{
            RazorpayClient razorpay = new RazorpayClient(apiKey, secretKey);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email",true);
            notify.put("phone",true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", "http://localhost:5173/upgrade_plan/success?planType="+planType);

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = paymentLink.get("id");
            String paymentLinkUrl = paymentLink.get("short_url");

            PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();
            paymentLinkResponse.setPaymentLinkId(paymentLinkId);
            paymentLinkResponse.setPaymentLinkUrl(paymentLinkUrl);

            return new ResponseEntity<>(paymentLinkResponse, HttpStatus.CREATED);
        }
        catch(Exception e){

        }
        return null;
    }
}
