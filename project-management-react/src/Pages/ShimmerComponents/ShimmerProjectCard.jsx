/* eslint-disable no-unused-vars */
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const ShimmerProjectCard = () => {
  return (
    <div className="">
      <Skeleton className="p-5 w-full lg:max-w-3xl ">
        <div className="space-y-10 ">
          <div className="space-y-5">
            <div className="flex justify-between">
              <div className="flex items-center gap-5">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
            <Skeleton className="h-4 w-[70%]" />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton key={index} className="h-3 w-[50px]" />
            ))}
          </div>
        </div>
      </Skeleton>
    </div>
  );
};
