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
import { useDispatch, useSelector } from "react-redux"
import { clearCategoryWiseProjects, fetchProjects, filterProjectsByCategory } from "@/Redux/Project/Action"

export const categories = [
    { value: "all", label: "All" },
    { value: "fullstack", label: "Full Stack" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "webdev", label: "Web Development" },
    { value: "androiddev", label: "Android Development" },
    { value: "machinelearning", label: "Machine Learning" },
    { value: "devops", label: "DevOps" },
  ];
  

export const CategoryFilter = ()=> 
  {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const {project} = useSelector(store=>store);

  const dispatch = useDispatch();

  const handleFilterCategory = (value) => {
      if (value == "all") {
        dispatch(clearCategoryWiseProjects()).then(() => {
          console.log(
            "Cleared category wise projects:",
            project?.categoryWiseProjects
          );
        });
      } else {
        dispatch(filterProjectsByCategory(value)).then((filteredProjects) =>
          console.log("Filetered projects are:", filteredProjects)
        );
      }
      console.log(value);
    };

   React.useEffect(() => {
        dispatch(fetchProjects({}));
       
      }, [dispatch]);

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
            ? categories.find((category) => category.value === value)?.label
            : "Select Category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command className="bg-black">
          <CommandInput className="font-sans " placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    const newCat = currentValue === value ? "" : currentValue;
                    setValue(newCat)
                    setOpen(false)
                    handleFilterCategory(newCat);
                  }}
                  className="font-sans"
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.value ? "opacity-100" : "opacity-0"
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
export default CategoryFilter;