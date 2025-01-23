/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch } from 'react-redux';
import { inviteToProject } from '@/Redux/Project/Action';
import { useParams } from 'react-router-dom';

const InviteMemberForm = () => {

  const dispatch = useDispatch();
  const {id} = useParams();
  const form = useForm({
    defaultValues: {
        email: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(inviteToProject({email:data.email,projectId:id}))
  };

  return (
    <div>
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
                        className="border w-full border-gray-500 p-5"
                        placeholder="Email"
                    />
                    </FormControl>
                </FormItem>
                )}
            /> 
            <DialogClose>
            <Button type="submit" className="w-full">
                Invite
            </Button>
            </DialogClose>
            
        </form>
      </Form>
    </div>
  );
};

export default InviteMemberForm;