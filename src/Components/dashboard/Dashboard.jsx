import React from 'react'
import Card from './Card'
  // import Sidebar from './Sidebar'
  import Emplist from './Emplist'
import Piechart from './Piechart'

 
const Dashboard = () => {   
  return (
    <div className="w-full">  
      
      <div className='flex overflow-visible'>
        {/* <Sidebar/> */}
        <div className='w-full'>
               <Card/>
             <div className='flex justify-between bg-white'>
           <Emplist/>
           <Piechart/>
         </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
