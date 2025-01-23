/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */

import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/Button";
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/NavBar/Navbar";
import ProjectList from "./Pages/ProjectList/ProjectList";
import { ProjectDetails } from "./Pages/ProjectDetails/ProjectDetails";
import { TaskDetails } from "./Pages/IssueDetails/TaskDetails";
import { Subscription } from "./Pages/Subscription/Subscription";
import Auth from "./Pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";
import { SubscriptionSuccess } from "./Pages/Subscription/SubscriptionSuccess";
import { AcceptInvitationPage } from "./Pages/ProjectComponents/AcceptInvitationPage";
import { getUserSubscription } from "./Redux/Subscription/Action";
import { InvitationError} from "./Pages/Errors/InvitationError";
import { ErrorPage} from "./Pages/Errors/ErrorPage";

// import { store } from "./Redux/Store";

function App() {
  
  const dispatch = useDispatch();

  const {auth,project} = useSelector(store=>store)


  useEffect(()=>{

   if(auth.user==null)
      dispatch(getUser())
   else
      console.log("User already present in store.")

  },[auth.jwt])

   const {subscription} = useSelector(store=>store);
     
  return (
    <>
    
      {auth.user? 
        <div>          
           <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<TaskDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<SubscriptionSuccess />} />
            <Route path="/accept_invitation" element={<AcceptInvitationPage />} />
            <Route path="/invitation_error" element={<InvitationError />} />
           
          </Routes>
        </div>
       :
        <div>
          <Routes>
              <Route path="/login" element={<Auth />} />
              <Route path="/" element={<Home />} />
          </Routes>
        </div>
        
      }
      <Routes>
      <Route path="/error" element={<ErrorPage/>} />
      </Routes>
       
    </>
  );
}

export default App;
