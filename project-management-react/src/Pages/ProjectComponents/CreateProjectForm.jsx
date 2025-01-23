/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";
import { tags } from "../ProjectList/ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { createProjects } from "@/Redux/Project/Action";
import {useSelector } from "react-redux";
import { getUser } from "@/Redux/Auth/Action";

export const CreateProjectForm = () => {
  
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);
  const form = useForm({
    // resolver:zod
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: ["Javascript", "React" , "Python"],
    },
  });

  const onSubmit = (data) => {

    console.log("Project details", data);
    dispatch(createProjects(data)).then(()=>dispatch(getUser()));
      
  };

  const handleTagsChange=(item)=>
  {
    const currentTags = form.getValues("tags");

    const updatedTags = currentTags.includes(item)?currentTags.filter((tag) => tag !== item):[...currentTags,item];
    form.setValue("tags",updatedTags);

  }
  return (
    
    <div>
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
                    className="border w-full border-gray-500 p-5"
                    placeholder="Project Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-500 p-5"
                    placeholder="Project Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    defaultValue="fullstack"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  > 
                    <SelectTrigger>
                      <SelectValue placeholder="category"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem  value="fullstack">Full Stack</SelectItem>
                      <SelectItem  value="frontend">Frontend</SelectItem>
                      <SelectItem  value="backend">Backend</SelectItem>
                      <SelectItem  value="webdev">Web dev</SelectItem>
                      <SelectItem  value="androiddev">Android dev</SelectItem>
                      <SelectItem  value="machinelearning">Machine Learning</SelectItem>
                      <SelectItem  value="devops">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => handleTagsChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tags"/>
                    </SelectTrigger>
                    <SelectContent>
                     {tags.slice(1).map((tag,index)=>
                     <SelectItem 
                     key={index} 
                     value={tag}>
                      {tag.charAt(0).toUpperCase()+tag.substring(1)}
                    </SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormControl>
                 <div className="flex flex-wrap gap-2 items-center">
                  {field.value.map((item,index)=>
                    (<div onClick={()=>handleTagsChange(item)} key={index} className="cursor-pointer flex gap-3 items-center rounded-full border px-2 py-1 "> 
                      <span className="text-gray-500">{item}</span>
                      <Cross1Icon className="h-3 w-3" ></Cross1Icon>
                    </div>)
                  )}
                 </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose className="mt-4 ">
              <div>
                 <Button type="submit" className="w-full py-2 border-none">
                  Save
                 </Button>
              </div>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};
export default CreateProjectForm;