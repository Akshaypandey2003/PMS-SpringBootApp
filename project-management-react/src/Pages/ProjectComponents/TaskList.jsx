/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import React, { useEffect } from 'react'
import { CardHeader } from '@/components/ui/card'
import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import CreateTaskForm from './CreateTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssueById, fetchTasks } from '@/Redux/Issues/Action';
import { useParams } from 'react-router-dom';

export const TaskList = ({status,title}) => {
 
    const {id} = useParams();
    const dispatch = useDispatch();
    const {issue} = useSelector(store=>store);

    useEffect(()=>{
       dispatch(fetchTasks(id));
    },[])
    
   console.log("Issues inside Tasklist:",issue);
  return (
    <>
     <div>
        <Dialog>
            <Card className="w-full md:w-[300px] lg:w-[310px] bg-black">
                <CardHeader>
                   <CardTitle>
                    <span className='font-sans'>{title}</span>

                   </CardTitle>
                </CardHeader>
                <CardContent className="px-2 ">

                    <div className="flex flex-col gap-3">
                       {issue?.issues?.length > 0 ? issue?.issues?.filter((issue=>issue?.status==status)).map((item,index) => (
                          <TaskCard key={index} item = {item} projectId={id}/>
                       )): 
                       <p className='font-sans text-center'>No task available</p>
                       }
                    </div>
                </CardContent>
                {(status=="pending") &&
                <CardFooter>
                    <DialogTrigger>
                        <Button variant="outline" className="w-full  flex items-center gap-2 bg-black hover:bg-gray-950 hover:border-none">
                           <span className='font-sans'>Add task</span> 
                            <PlusIcon></PlusIcon>
                        </Button>
                        
                    </DialogTrigger>
                </CardFooter>
                }
            </Card>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Create Task </DialogTitle>          
                </DialogHeader>


                <CreateTaskForm status={status}/>

            </DialogContent>
        </Dialog>
     </div>  
    </>
    
  )
}
export default TaskList;