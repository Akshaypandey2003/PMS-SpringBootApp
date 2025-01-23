/* eslint-disable no-unused-vars */
import React from 'react'
import { ProjectList } from '../ProjectList/ProjectList'
import { useSelector } from 'react-redux'
import HomePage from './HomePage';

export const Home = () => {

  const {auth} = useSelector(store=>store);
  return (
    <div>
      {
        auth?.user == null ?
        <>
         <HomePage/>
        </> 
        :
        <>
         <ProjectList />
        </>
       
      }
       
    </div>
  )
}
export default Home
