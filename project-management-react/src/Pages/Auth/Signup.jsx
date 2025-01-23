/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/Redux/Auth/Action";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const loginValidationSchema = Yup.object().shape({
  name: Yup.string()
  .min(4, "Name must be at least 4 characters long")
  .matches(/^[a-zA-z ]$/,"Enter valid name (Eg. John wick)")
  .required("Name is required"),
  email: Yup.string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email address"
  )
  .required("Email is required"),
   password: Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one digit")
  .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
  .required("Password is required"),
});
export const Signup = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    // resolver: yupResolver(loginValidationSchema), // Apply validation
  });


  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(register(data)).then(()=>navigate("/home"));
  };
  const {auth} = useSelector(store=>store);


  return (

   
    <div>
        <h1 className="text-2xl font-semibold text-center pb-5 font-sans">Register with us</h1>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-500 p-5 font-sans"
                    placeholder="Name"
                  />
                </FormControl>
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs font-sans">
                    {form.formState.errors.name.message}
                    
                  </p>
                )}
                {auth?.error?.nameError && (
                   <p className="text-red-500 text-xs font-sans">
                   {auth?.error?.nameError}
                    </p>
                )}
              </FormItem>
            )}
          />
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
                  <p className="text-red-500 text-xs font-sans ">
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
            <Button type="submit" className="w-full font-sans">
               Register
            </Button>
            {auth?.error?.userError && (
               <p className="text-red-500 text-xs font-sans">
               {auth?.error?.userError}
             </p>
            )}
        </form>
      </Form>
    </div>
  );
};
export default Signup
