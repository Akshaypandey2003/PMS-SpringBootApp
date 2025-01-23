/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { assigneUserToIssue, fetchTasks } from "@/Redux/Issues/Action";
// import { useParams } from "react-router-dom";

export const MemberList = ({ issueDetails }) => {

 
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();
  const {issue} = useSelector(store=>store); //for testing purpose
  console.log("Issues inside member list:",issue);


  const handleAssignMember = (userId) => {
    dispatch(assigneUserToIssue({ issueId: issueDetails.id, userId: userId }));
    
  };

  console.log("Inside member list component: ", issueDetails);
  return (
    <div className="space-y-2 p-2 bg-black">
      {issueDetails?.assignee == null ? (
        <div className="flex flex-col items-center gap-2">
          <p className="font-sans">Unassigned</p>
          {project?.projectDetails?.team.map((item, index) => (
            <div
              onClick={() => handleAssignMember(item.id)}
              key={index}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Avatar className="bg-black">
                <AvatarFallback className="bg-gray-950 font-sans">{item.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm leading-none font-sans">{item.name}</p>
                <p className="text-sm leading-none text-muted-foreground font-sans">
                  {item.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex border rounded-md p-2 bg-black">
          <Avatar className="bg-black">
            <AvatarFallback className="bg-gray-950 font-sans">{issueDetails?.assignee?.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className=" px-3 font-sans">{issueDetails?.assignee?.name}</p>
            <p className="px-3 text-sm text-gray-600 font-sans">
              {issueDetails?.assignee?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default MemberList;
