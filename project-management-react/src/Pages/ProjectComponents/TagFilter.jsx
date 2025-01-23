/* eslint-disable no-unused-vars */
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { clearTagsWiseProjects, filterProjectsByTag } from "@/Redux/Project/Action"
import { useDispatch, useSelector } from "react-redux"

export const tags = [
    { value: "all", label: "All" },
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "mysql", label: "MySQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "express", label: "Express" },
    { value: "nodejs", label: "Node.js" },
    { value: "tailwindcss", label: "Tailwind CSS" },
    { value: "sass", label: "Sass" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "python", label: "Python" },
    { value: "flask", label: "Flask" },
    { value: "django", label: "Django" },
  ];
  

export const TagFilter = ()=> {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  
  const {project} = useSelector(store=>store);
  const dispatch = useDispatch();

  const handleFilterTag = (value) => {
      if (value == "all") {
        dispatch(clearTagsWiseProjects()).then(() => {
          console.log("Cleared tags wise projects: ", project?.tagsWiseProjects);
        });
      } else
        dispatch(filterProjectsByTag(value)).then((filteredProjects) =>
          console.log("Filetered projects are:", filteredProjects)
        );
  
      console.log(value);
    };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between font-sans bg-black"
        >
          {value
            ? tags.find((tag) => tag.value === value)?.label
            : "Select Tag..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command className="bg-black">
          <CommandInput className="font-sans " placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  onSelect={(currentValue) => {
                    const newTag = currentValue === value ? "" : currentValue;
                    setValue(newTag)
                    setOpen(false)
                    handleFilterTag(newTag);
                  }}
                  className="font-sans"
                >
                  {tag.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === tag.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default TagFilter;