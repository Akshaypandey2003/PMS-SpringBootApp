/* eslint-disable no-unused-vars */
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateCommentForm from "../ProjectComponents/CreateCommentForm";
import CommentCard from "../ProjectComponents/CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issues/Action";
import { fetchComments } from "@/Redux/Comment/Action";

export const TaskDetails = () => {

  const { projectId, issueId } = useParams();
  const {issue,comment} = useSelector(store=>store);
  const dispatch = useDispatch();

  const handleUpdateTask = (status)=>{
    dispatch(updateIssueStatus(issueId,status))
  }

 

  useEffect(()=>{

   dispatch(fetchIssueById(issueId))
   dispatch(fetchComments(issueId))

  },[issueId]);
  console.log("Inside issue details",issue);
  
  const owner = issue?.issues?.find((item) => item.id === issue.issueDetails?.id)?.project?.owner?.name;

  return (
    <div className="p-5 text-gray-400 home-background">
      <div className="flex justify-between  px-10 rounded-lg">
        <ScrollArea className="h-[84vh]  w-[60%] p-4 border bg-black rounded-md">
          <div className="">
            <h1 className="text-lg font-semibold text-gray-400 font-sans">
              {issue.issueDetails?.title}
            </h1>
            <div className="">
              <p className="text-sm text-gray-500 mt-2 font-sans">
              {issue.issueDetails?.description}
              </p>
            </div>
            <div className="mt-5">
              <h1 className="pb-3 font-sans">Activity</h1>
              <Tabs defaultValue="comments">
                <TabsList className="mb-4 bg-gray-950 font-sans">
                  <TabsTrigger className="border-none" value="all">
                    All
                  </TabsTrigger>
                  <TabsTrigger className="border-none" value="comments">
                    Comments
                  </TabsTrigger>
                  <TabsTrigger className="border-none" value="history">
                    History
                  </TabsTrigger>
                </TabsList>
                {/* -------------------------------------All Tabs------------------------------------  */}
                <TabsContent value="all">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>
                        Make changes to your account here. Click save when you are done.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@peduarte" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                {/* ----------------------Comments Tab------------------------------ */}
                <TabsContent value="comments">
                  <CreateCommentForm issueId = {issueId}/>
                  <div className="mt-4 space-y-6">
                    {comment.comments[0]?.map((item,index)=>(
                     
                     <CommentCard item={item} key={index} />
                    
                    ))}
                  </div>
                </TabsContent>
                {/* ----------------------------History tab-------------------------- */}
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>
                        Make changes to your account here. Click save when you are done.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@peduarte" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2 bg-black rounded-md">
          <Select onValueChange={handleUpdateTask} className="font-sans">
            <SelectTrigger className=" border-b-4">
              <SelectValue className="font-sans" placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="font-sans">
              <SelectItem value="pending" >
                <span className="font-sans">To do</span> </SelectItem>
              <SelectItem value="In Progress" className="font-sans">
                <span className="font-sans">In Progress</span></SelectItem>
              <SelectItem value="done" className="font-sans">
                <span className="font-sans">Done</span></SelectItem>
            </SelectContent>
          </Select>
          <div className=" rounded-lg ">
              <p className="border-b py-3 px-5 font-sans ">Details</p>
              <div className="p-5">
                  <div className="space-y-5">
                      <div className="flex gap-10 items-center">
                          <p className="w-[7rem] font-sans">Assignee</p>
                         
                          {issue.issueDetails?.assignee?.name? <>
                            <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gray-950 font-sans">{issue.issueDetails?.assignee?.name[0]}</AvatarFallback>
                            </Avatar>
                            <p className="font-sans">{issue.issueDetails?.assignee?.name}</p>
                          </div>
                          </>: <><p className="font-sans">unassigned</p></>}
                         
                      </div>
                      <div className="flex gap-10 items-center">
                          <p className="w-[7rem] font-sans">Labels</p>
                          <p className="font-sans">None</p>
                      </div>
                      
                      <div className="flex gap-10 items-center">
                          <p className="w-[7rem] font-sans">Status</p>
                          <Badge className="font-sans">
                            {issue.issueDetails?.status}
                          </Badge>
                      </div>
                      <div className="flex gap-10 items-center">
                          <p className="w-[7rem] font-sans">Release</p>
                          <p className="font-sans">{issue.issueDetails?.dueDate}</p>
                      </div>
                      <div className="flex gap-10 items-center">
                          <p className="w-[7rem] font-sans">Reports To</p>
                          <div className="flex items-center gap-2">
                           
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gray-950 font-sans">
                                {owner ? owner[0] : "J"}
                              </AvatarFallback>
                            </Avatar>
                            <p className="font-sans">{owner ? owner : "James"}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskDetails;
