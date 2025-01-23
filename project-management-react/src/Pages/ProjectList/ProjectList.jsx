/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  MixerHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "../ProjectComponents/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProjects,
  fetchProjects
} from "@/Redux/Project/Action";
import { ShimmerProjectCard } from "../ShimmerComponents/ShimmerProjectCard";
import Chart from "../ProjectComponents/Chart";
import CategoryFilter from "../ProjectComponents/CategoryFilter";
import TagFilter from "../ProjectComponents/TagFilter";


export const tags = [
  "all",
  "react",
  "nextjs",
  "mysql",
  "mongodb",
  "express",
  "nodejs",
  "tailwindcss",
  "sass",
  "bootstrap",
  "python",
  "flask",
  "django",
];

export const ProjectList = () => {

  //Keyword required to search projects 
  const [keyword, setKeyword] = React.useState("");

  //project slice from the store
  const { project } = useSelector((store) => store);

  console.log("inside project list all projects are:", project?.projects);

  const allProjects = [
    ...(project?.categoryWiseProjects || []),
    ...(project?.tagsWiseProjects || []),
  ];

  const filteredProjects = allProjects.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  console.log("Combined filtered projects are: ", filteredProjects);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    e.target.value ? setKeyword(e.target.value) : setKeyword("");
    dispatch(searchProjects(keyword));
  };
  const [showShimmer, setShowShimmer] = useState(true);

  useEffect(() => {
    dispatch(fetchProjects({}));
    const timer = setTimeout(() => {
      setShowShimmer(false); // After 3 seconds, hide the shimmer and show something else
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <>
      <div className="p-5 home-background">
        <Chart className="bg-black" />
      </div>

      <div className="home-background px-5  lg:px-0 lg:flex gap-5 py-5">
        <section className="filter-section px-5  flex gap-5  m-auto">
          <MixerHorizontalIcon className="w-8 h-8 text-black" />

          <CategoryFilter/>
          <TagFilter />
          <div className="">
            <div
              onChange={handleSearchChange}
              className="relative font-sans w-[30rem]"
            >
              <Input placeholder="Search Projects" className=" bg-black" />
              <MagnifyingGlassIcon className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </section>
      </div>
      <div className="home-background px-5  lg:px-0 lg:flex gap-5  justify-center ">
        <section className="project-list-section w-full  px-5 ">
          <ScrollArea className="h-[85vh]  mr-4 ">
            <div className="">
              <div className="space-y-5  p-8 flex flex-wrap justify-center gap-5 ">
                {keyword ? (
                  project?.searchProjects &&
                  project.searchProjects.length > 0 ? (
                    project.searchProjects.map((item) => (
                      <ProjectCard
                        key={item.id * Math.random(1, 10)}
                        item={item}
                        className=""
                      />
                    ))
                  ) : (
                    <div className="space-y-4">No project found</div>
                  )
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((item) => (
                    <ProjectCard
                      key={item.id * Math.random(10, 20)}
                      item={item}
                      className="mt-8"
                    />
                  ))
                ) : project?.projects && project.projects.length > 0 ? (
                  project.projects.map((item) => (
                    <ProjectCard
                      key={item.id * Math.random(10, 20)}
                      item={item}
                      className="mt-8"
                    />
                  ))
                ) : showShimmer ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((index) => (
                      <ShimmerProjectCard key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h1>Please add few projects to get started!!</h1>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </section>
      </div>
      {/* <div className=" home-background realtive px-5 lg:px-0 lg:flex gap-5 justify-center py-2">
     
        <section className="filter-section p-2">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between items-center lg:w-[20rem]">
              <p className="text-xl -tracking-wider">Filters</p>
              <Button size="icon" variant="ghost">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="">
              <ScrollArea className=" space-y-7 h-[70vh] p-3">
                <div className="mb-8">
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="flex flex-col gap-y-4"
                      defaultValue="all"
                      onValueChange={(value) => handleFilterCategory(value)}
                    >
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-1">All</Label>
                        <RadioGroupItem value="all" id="cat-1" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-2">Full Stack</Label>
                        <RadioGroupItem value="fullstack" id="cat-2" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-3">Frontend</Label>
                        <RadioGroupItem value="frontend" id="cat-3" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-4">Backend</Label>
                        <RadioGroupItem value="backend" id="cat-4" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-4">Web Dev</Label>
                        <RadioGroupItem value="webdev" id="cat-4" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-4">Android Dev</Label>
                        <RadioGroupItem value="androiddev" id="cat-4" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-4">Machine Learning</Label>
                        <RadioGroupItem value="machinelearning" id="cat-4" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cat-4">Dev Ops</Label>
                        <RadioGroupItem value="devops" id="cat-4" />
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="mb-8">
                  <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="flex flex-col gap-y-4"
                      defaultValue="all"
                      onValueChange={(value) => handleFilterTag(value)}
                    >
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex justify-between items-center"
                        >
                          <Label htmlFor={tag}>
                            {tag.charAt(0).toUpperCase() + tag.substring(1)}
                          </Label>
                          <RadioGroupItem value={tag} id={tag} />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="project-list-section w-full lg:w-[65rem] ">
          <ScrollArea className="h-[85vh]  mr-4">
            <div className="flex gap-2 items-center justify-between ">
              <div
                onChange={handleSearchChange}
                className="relative w-[90%] p-2"
              >
                <Input placeholder="Search Projects" />
                <MagnifyingGlassIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="px-10">
              <div className="space-y-5 broder-2 p-8">
                {keyword ? (
                  project?.searchProjects &&
                  project.searchProjects.length > 0 ? (
                    project.searchProjects.map((item) => (
                      <ProjectCard
                        key={item.id * Math.random(1, 10)}
                        item={item}
                        className="mt-8"
                      />
                    ))
                  ) : (
                       <div className="space-y-4">
                          No project found
                        </div>
                  )
                ) :
                filteredProjects.length>0 ?
                filteredProjects.map((item)=>(
                  <ProjectCard key = {item.id*Math.random(10,20)} item = {item}
                  className="mt-8" />
                )) :
                  project?.projects && project.projects.length > 0 ? 
                  (
                    project.projects.map((item) => (
                    <ProjectCard
                      key={item.id * Math.random(10, 20)}
                      item={item}
                      className="mt-8"
                    />
                  ))
                ) : showShimmer? (
                    <div className="space-y-4"> 
                      {[1,2,3,4].map((index)=>(
                         <ShimmerProjectCard key={index}/>
                      ))}
                    </div>
                  ): ( <div className="space-y-4"> 
                        <h1>Please add few projects to get started!!</h1>
                       </div>
                       )
              }

              </div>
            </div>
          </ScrollArea>
        </section>
      </div> */}
    </>
  );
};
export default ProjectList;
