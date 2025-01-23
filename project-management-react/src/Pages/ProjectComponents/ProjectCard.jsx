/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProject, fetchProjectById } from "@/Redux/Project/Action";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ item }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = (projectId) => {
    dispatch(deleteProject({ projectId: item.id }));
  };

  return (
    <Card className="p-5 w-[30%] lg:max-w-3xl project-card-container mt-5">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate("/project/" + item.id)}
                className="cursor-pointer font-bold text-lg font-sans"
              >
                {item.name.substring(0,13)+"..."}
              </h1>
              <DotFilledIcon />
              <p className="text-gray-400 font-sans">{item.category}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black">
                  <DropdownMenuItem onClick={handleDelete} className="bg-gray-950 bg-gray-950">
                    <span className="font-sans">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-sans">{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {item.tags.slice(0, 4).map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-2 border-red-500 font-sans"
            >
              {tech}
            </Badge>
          ))}
          {item.tags.length > 4 && <span className="text-gray-500">...</span>}
        </div>
      </div>
    </Card>
  );
};
