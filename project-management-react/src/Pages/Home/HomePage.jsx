/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAllProjects } from "@/Redux/Project/Action";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import Footer from "../ProjectComponents/Footer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const navigate = useNavigate();

  // References for animations
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // // Animate the home container dropping from the top
    // tl.fromTo(
    //   ".home-primary-container",
    //   { y: "-100%", opacity: 0 },
    //   { y: "0%", opacity: 1, duration: 1.5 }
    // );

    //home container animation
    // GSAP timeline for animations
    // const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // // Animate the home container dropping in and scaling up
    // tl.fromTo(
    //   ".home-primary-container",
    //   { y: "-100%", scale: 0.8, opacity: 0 },
    //   { y: "0%", scale: 1, opacity: 1, duration: 1.5 }
    // );

    // // Stagger animation for badges
    // tl.fromTo(
    //   ".badge-item",
    //   { y: 20, opacity: 0 },
    //   { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
    //   "-=0.5" // Overlap with the previous animation
    // );

    // // Add a subtle bounce effect to the main heading
    // tl.fromTo(
    //   ".main-heading",
    //   { scale: 0.9, opacity: 0 },
    //   { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
    //   "-=1"
    // );

    // // Fade in the subheading
    // tl.fromTo(
    //   ".sub-heading",
    //   { opacity: 0, y: 20 },
    //   { opacity: 1, y: 0, duration: 1 },
    //   "-=0.8"
    // );

    // //Home container animation
    tl.fromTo(
      containerRef.current,
      { scale: 0.5, opacity: 5 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(0.5, 2)" }
    );

    // Animate heading text (split into words)
    const headingWords = headingRef.current?.textContent.split(" ") || [];
    const headingSpans = headingWords.map(
      (word) => `<span class="heading-word">${word}</span>`
    );
    headingRef.current.innerHTML = headingSpans.join(" ");

    gsap.fromTo(
      ".heading-word",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, stagger: 0.1 },
      "-=1"
    );

    // Animate subheading text (split into characters)
    const subHeadingChars = subHeadingRef.current?.textContent.split("") || [];
    const subHeadingSpans = subHeadingChars.map(
      (char) => `<span class="subheading-char">${char}</span>`
    );
    subHeadingRef.current.innerHTML = subHeadingSpans.join("");

    gsap.fromTo(
      ".subheading-char",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.05, stagger: 0.03 },
      "-=1.2"
    );

    // Stagger animation for badges
    tl.fromTo(
      ".badge-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
      "-=0.5"
    );
  }, []);

  const mockData = [
    {
      type: "Create Projects",
      desc: "Create projects smoothly and divide projects into subtasks.",
    },
    {
      type: "Manage Projects",
      desc: "Manage project flow keep track of task and status of the project.",
    },
    {
      type: "Collaborate",
      desc: "Collaborate with others by inviting members to join your project and assing tasks to members.",
    },
    {
      type: "Track Status",
      desc: "Track the status of project and its sub tasks and update the status accordingly.",
    },
    {
      type: "Project Analytics",
      desc: "Analyze the project timeline and project completion duration, track your working efficiency.",
    },
  ];

  return (
    <>
      <div
        ref={containerRef}
        className="home-background flex p-[2rem] gap-[2rem] h-[89vh]"
      >
        <Card className="card-container flex gap-2">
          <div
            id="img-container-1"
            className="image-container w-[25%] h-[70%] m-auto m-10 "
          ></div>

          <div className="main-container-content p-10 w-[50%]  m-auto m-10 text-wrap text-center  rounded-xl">
            <h1 ref={headingRef} className="text-5xl font-sans text-black">
              Empower your team, streamline your projects, and achieve success
              together
            </h1>
            <h2 ref={subHeadingRef} className="text-3xl font-sans m-8">
              Success starts with organization, Let’s make it happen
            </h2>

            <div className="primary-inner-2 w-full mt-20">
              {mockData.map((item, index) => (
                <HoverCard className="m-4" key={index}>
                  <HoverCardTrigger>
                    <Badge
                      variant="outline"
                      className="m-2  text-black cursor-default border border-black"
                    >
                      <span className="font-mono font-thin text-white">
                        {item.type}
                      </span>
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-gray-950">
                    <p className="font-mono">{item.desc}</p>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
            <div className="flex gap-x-2 mt-4">
              <Button
                onClick={() => navigate("/login")}
                className="m-auto bg-black rounded-2xl hover:bg-purple-300 hover:text-black "
              >
                <p className="font-xl font-sans">Get Started</p>
              </Button>
            </div>
          </div>

          <div
            id="img-container-2"
            className="image-container w-[25%] h-[70%]  m-auto m-10"
          ></div>
        </Card>
      </div>
      <div className="home-background p-[2rem] gap-[2rem] items-center">
        {/* <Card className="bg-transparent border-none mx-auto p-5 w-[60%]">
          <CardContent className=""> */}
        <h1 className="text-4xl card font-sans text-center text-black">
          Streamlined Project Management
        </h1>
        <p className="font-mono text-center text-sm">
          Easily create,manage and collaborate on projects
        </p>
        {/* </CardContent> */}
        {/* <div
            id="img-container-3"
            className="bg-transparent image-container w-full h-72  m-auto mt-10 "
          ></div> */}

        {/* <div className=" w-full flex flex-wrap gap-5 p-4 justify-center">
            <div className="w-[40%]">
              <h1 className="text-xl mb-2 text-black font-bold font-sans">
                Interactive Analytics
              </h1>
              <p className="font-sans font-thin text-white">
                 Analyze the project timeline and project completion duration, track your working efficiency.
              </p>
            </div>
            <div className="w-[40%]">
              <h1 className="text-xl mb-2 text-black font-bold font-sans">
                Collaborative Features
              </h1>
              <p className="font-sans font-thin text-white">
              Collaborate with others by inviting members to join your project and assing tasks to members.
              </p>
            </div>
            <div className="w-[40%]">
              <h1 className="text-xl mb-2 text-black font-bold font-sans">
                User Friendly Interface
              </h1>
              <p className="font-sans font-thin text-white">
              A user-friendly interface designed for simplicity and efficiency, ensuring seamless navigation and an intuitive experience for all users.
              </p>
            </div>
            <div className="w-[40%]">
              <h1 className="text-xl mb-2 text-black font-bold font-sans">
                Subscription Based Model
              </h1>
              <p className="font-sans font-thin text-white">
              A subscription-based model offering flexible plans, ensuring continuous access to premium features with seamless upgrades and renewals.
              </p>
            </div>
           
          </div> */}
        {/* </Card> */}
        <div id="" className="flex w-full h-[50vh] shadow-[#14173b] shadow-md  mt-10 p-4 m-auto">
          <div>
            <img src="/Frame1.png" alt="" className="" />
          </div>

          <div className=" desc-1 w-[40%] p-6  shadow-[#14173b] shadow-2xl">
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
              Interactive Analytics
            </h1>
            <p className="font-sans font-thin text-white mb-2">
              Analyze the project timeline and project completion duration,
              track your working efficiency, adjust time intervals to see time specific project records.
            </p>
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
              Add New Projects
            </h1>
            <p className="font-sans font-thin text-white mb-2">
              Create new projects with ease and manage them efficiently, filter projects based on category and tags.
            </p>
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
              Upgrade Plan
            </h1>
            <p className="font-sans font-thin text-white mb-2">
              Upgrade your plan to access premium features and enjoy a seamless project management experience.
            </p>
          </div>
        </div>

        <div
          id=""
          className=" w-full  h-[50vh] shadow-[#14173b] shadow-md  flex justify-between p-4 "
        >
          <div className="w-[50%] object-cover overflow-hidden">
            <img src="/projectImg-2.png" alt="" className="" />
          </div>

          <div className="desc-2 w-[38%]   p-6 shadow-[#14173b] shadow-2xl">
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
              Track Task Status
            </h1>
            <p className="font-sans font-thin text-white mb-2">
             Add new subtasks and track their status, update the status of the task and keep track of the project flow.
            </p>
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
              Invite Members
            </h1>
            <p className="font-sans font-thin text-white mb-2">
              Invite members to joing your project and assign tasks to members, collaborate with others and work together to achieve success.
            </p>
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
              Chat
            </h1>
            <p className="font-sans font-thin text-white mb-2">
             Chat with members and discuss project details, share files and images, keep track of project updates and progress.
            </p>
          </div>
        </div>
        <div
          id=""
          className=" w-full  h-[50vh] shadow-[#14173b] shadow-md  flex justify-between p-4 "
        >
          <div className="w-[50%] object-cover overflow-hidden">
            <img src="/projectImg-3.png" alt="" className="" />
          </div>

          <div className="desc-3 w-[38%] p-6 shadow-[#14173b] shadow-2xl py-16">
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
             Comment
            </h1>
            <p className="font-sans font-thin text-white mb-6">
              Members can post comments on tasks and projects, discuss project details and updates, share ideas and feedback.
            </p>
            <h1 className="text-xl mb-2 text-black font-bold font-sans">
              Task Details
            </h1>
            <p className="font-sans font-thin text-white mb-2">
              Review task details and update the task status, add comments and files to the task, track the task progress.
            </p>
           
          </div>
        </div>
       
      </div>
      <div className="footer p-4">
        {/* <Card className="border-none">
         <Footer />
        </Card> */}
        <p className="text-center font-sans">© 2025 PMS All rights reserved.</p>
      </div>
    </>
  );
};

export default HomePage;
