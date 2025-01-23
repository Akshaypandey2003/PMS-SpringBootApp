/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComments } from "@/Redux/Comment/Action";

export const CreateCommentForm = ({ issueId }) => {

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });
  const dispatch = useDispatch();

  const {auth} = useSelector(store=>store);

  console.log("Auth inside create comment form",auth);

  const onSubmit = (data) => {
    dispatch(createComment({content:data.content,issueId})).then(()=>dispatch(fetchComments(issueId)));
  };
  
  return (
    <div>
      <Form {...form}>
        <form className="space-y-3 p-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem >
                <div className="flex gap-2 items-center">
                  <div>
                    <Avatar>
                      <AvatarFallback className="bg-gray-950 font-sans">
                        {auth?.user?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-[30rem] p-5 border font-sans"
                      placeholder="Type your comment here..."
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[5rem] font-sans">
            Post
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default CreateCommentForm;
