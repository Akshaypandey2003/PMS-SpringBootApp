/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteMemberForm from "../ProjectComponents/InviteMemberForm";
import TaskList from "../ProjectComponents/TaskList";
import Chatbox from "../ProjectComponents/Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";
import PieChartComponent from "../ProjectComponents/PieChart";

export const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { project } = useSelector((store) => store);
  console.log("inside project Details: ", project);

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);
  return (
    <>
      <div className=" p-5 lg:px-10 home-background">
        <div className="lg:flex gap-5 md:flex-row justify-between p-2">
          <ScrollArea className="h-[85vh] lg:w-[70%] pr-4 ">
            <div className="pb-10 w-full">
              <div className=" flex gap-2 justify-between border-b border-black p-2">
                <div className="px-5 w-[60%]">
                  <h1 className="text-lg font-sans font-semibold pb-5 text-black text-xl">
                    {project?.projectDetails?.name}
                  </h1>
                  <div className="text-sm">
                    <p className="font-sans w-full md:max-w-lg lg:max-w-xl text-black text-xl">
                      {project?.projectDetails?.description}
                    </p>
                    <div className="flex gap-2 pt-5 ">
                      <p className="font-sans text-black">Project Lead:</p>
                      <p className="font-sans text-black">
                        {" "}
                        {project?.projectDetails?.owner.name}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-5 items-center">
                      <p className="font-sans text-black">Members:</p>
                      <div className="flex item-center gap-2">
                        {project?.projectDetails?.team.map((member, index) => (
                          <Avatar key={index} className="cursor-pointer">
                            <AvatarFallback className="bg-gray-950 font-sans">
                              {member.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Dialog>
                        <DialogTrigger>
                          <Button className="bg-black" variant="outline">
                            <span className="font-sans ">Invite</span>
                            <PlusIcon className="w-5 h-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <p className="font-sans">
                              Invite Member
                            </p>
                          </DialogHeader>
                          <InviteMemberForm />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex gap-2 pt-5">
                      <p className="font-sans text-black">Category:</p>
                      <p className="font-sans text-black">
                        {" "}
                        {project?.projectDetails?.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-5">
                    <p className="font-sans text-black">Tags:</p>
                    {project?.projectDetails?.tags.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-black font-sans"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                {project?.projectDetails?.issues.length > 0 && (
                  <div className="">
                    <PieChartComponent />
                  </div>
                )}
              </div>
              <section>
                <h1 className="py-5 font-semibold  font-sans text-black text-xl text-center">
                  Tasks
                </h1>
                <div className="lg:flex md:flex gap-3 justify-between py-5">
                  <TaskList status="pending" title="To-do list" />
                  <TaskList status="In Progress" title="In Progress" />
                  <TaskList status="done" title="Done" />
                </div>
              </section>
            </div>
          </ScrollArea>
          <div className="lg:w-[30%] rounded-md sticky right-5 top-0">
            <Chatbox />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectDetails;
