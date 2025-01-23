/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import MemberList from "./MemberList";
import React, { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteIssue, fetchTasks } from "@/Redux/Issues/Action";
import { fetchProjectById } from "@/Redux/Project/Action";


export const TaskCard = ({item,projectId}) => {
  const {id} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleIssueDelete =()=>{
    dispatch(deleteIssue(item.id)).then(()=>dispatch(fetchTasks(id)))
  }
  const {project} = useSelector(store=>store)

  useEffect(()=>{
     dispatch(fetchProjectById(projectId))
  },[projectId])

  // console.log("Inside task cards project details are: ",project?.projectDetails);
  return (
    <Card className="rounded-md py-1 px-2 bg-gray-950 border-none">
      <CardHeader className="p-1">
        <div className="flex justify-between items-center">
          <CardTitle className="cursor-pointer font-sans" onClick={()=>navigate(`/project/${projectId}/issue/${item.id}`)}>{item.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border-none">
              <Button
                className="rounded-full border-none"
                variant="ghost"
                size="icon"
              >
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black">
              <DropdownMenuItem onClick = {handleIssueDelete} className="font-sans bg-gray-950"> Delete </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-1 ">
        <div className="flex items-center justify-between w-[100%]">
          <p className="font-sans">{item?.assignee!=null ? item?.assignee.name : project?.projectDetails?.owner.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border-none">
              <Button
                className="rounded-full border-none"
                variant="ghost"
                size="icon"
              >
                <Avatar>
                  <AvatarFallback className="bg-black font-sans">
                    {item?.assignee!=null ? item?.assignee.name.charAt(0).toUpperCase() : project?.projectDetails?.owner.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <MemberList issueDetails={item}/>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
