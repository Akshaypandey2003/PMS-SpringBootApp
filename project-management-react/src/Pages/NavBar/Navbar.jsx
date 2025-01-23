/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateProjectForm } from "../ProjectComponents/CreateProjectForm";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";

export const Navbar = () => {
  const navigate = useNavigate();
  const { auth, subscription } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()).then(() => navigate("/")); // Log out the user and navigate to login page
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Check if the page is scrolled more than 10px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
    className={`py-4 px-5 flex justify-between items-center sticky top-0 z-10 ${
      isScrolled ? "navbar-main-container" : "navbar-main-container-onScroll"
    }`}
    
    >
      <div className="flex items-center gap-5">
        <p
          onClick={() => navigate("/home")}
          className="cursor-pointer text-3xl font-semibold font-sans text-black"
        >
          PMS
        </p>
        <Dialog className="border-none">
          <DialogTrigger className="border-none px-5">
            <p className="text-xl font-sans text-black">Create Project</p>
          </DialogTrigger>
          {auth?.user && (
            <DialogContent>
              {subscription?.userSubscription?.planType === "FREE" &&
              auth.user.projectSize >= 3 ? (
                <div>
                  <h1 className="text-xl font-sans">
                    Your trial period has ended. To keep enjoying the services,
                    please choose a plan that suits your needs.
                  </h1>
                </div>
              ) : (
                <>
                  <DialogHeader>Create New Project</DialogHeader>
                  <CreateProjectForm />
                </>
              )}
            </DialogContent>
          )}
        </Dialog>

        <p
          onClick={() => {
            auth?.user && navigate("/upgrade_plan");
          }}
          className="text-lg font-sans text-black hover:cursor-pointer"
        >
          Upgrade
        </p>
      </div>
      {auth?.user != null ? (
        <div className="flex gap-3 items-center px-2">
          <DropdownMenu className=" border-none">
            <DropdownMenuTrigger className=" rounded-full">
              <Button
                variant="outline"
                size="icon"
                className="border-none rounded-full "
              >
                <PersonIcon className="border-none" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-center">
              {/* <DropdownMenuItem  > */}
                <Button className="m-auto  font-sans" onClick={handleLogout}>Logout</Button>
              {/* </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <h2 className="font-sans text-black font-bold text-xl">{auth.user?.name}</h2>
        </div>
      ) : (
        <div className="flex gap-x-2">
          <Button
            onClick={() => navigate("/login")}
            className="bg-black rounded-2xl hover:bg-purple-300 hover:text-black "
          >
            <p className="font-xl font-sans">Sign In</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
