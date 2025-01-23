/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getUserSubscription } from "@/Redux/Subscription/Action";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    // .min(8, "Password must be at least 8 characters long")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/\d/, "Password must contain at least one digit")
    // .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // resolver: yupResolver(loginValidationSchema), // Apply validation
  });

  const onSubmit = (data) => {
    dispatch(login(data)).then((response) => {
      if(response?.success)
        navigate("/home")
      else
      navigate("/error");

      dispatch(getUserSubscription(localStorage.getItem("jwt")));
    });
    console.log("Login details", data);
  };

  const { auth } = useSelector((store) => store);

  return (
    <div >
      <h1 className="text-2xl font-semibold text-center pb-5 font-sans">Sign In</h1>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border w-full border-gray-500 p-5 font-sans" 
                    placeholder="Email"
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <p className="text-red-500 text-xs font-sans">
                    {form.formState.errors.email.message}
                  </p>
                )}
                {auth?.error?.emailError && (
                  <p className="text-red-500 text-xs font-sans">
                    {auth?.error?.emailError}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border w-full border-gray-500 p-5 font-sans"
                    placeholder="Password"
                  />
                </FormControl>
                {form.formState.errors.password && (
                  <p className="text-red-500 text-xs font-sans">
                    {form.formState.errors.password.message}
                  </p>
                )}
                {auth?.error?.passwordError && (
                  <p className="text-red-500 text-xs font-sans">
                    {auth?.error?.passwordError}
                  </p>
                )}
              </FormItem>
            )}
          />
          {auth?.error?.status == 403 && (
            <p className="text-red-500 text-xs font-sans">
              Invalid username or password !!
            </p>
          )}
          <Button type="submit" className="w-full font-sans">
            SignIn
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Login;
