import React from 'react'
import Nixies from '../assets/Nixies.png';
const Default = () => {
  return (
    <>
    <div className='main-section h-[100vh] grid place-items-center         bg-gradient-to-br from-blue-300'>
<div className='content-section max-w-[536px] h-[430px]  p-[28px] text-justify items-center bg-[#fff] shadow-[0_8px_30px_#1414280f] justify-items-center rounded-2xl flex flex-col gap-y-2 '>
    <img className='animate-effect1' src={Nixies} alt="Nixies Logo" style={{width:"150px", height:"80px"}}/>

    <h2 className='text-black font-semibold text-[20px] mt-[10px] animate-effect'>Welcome to Nixies Employee Management System</h2>
    <p className='text-[#555] animate-effect'>This page is available.</p>
    <p className='text-[#888] text-[14px] animate-effect'><b className='text-[#5181b2]'>●Purpose:</b> This platform is designed to streamline and enhance the management of employee-related tasks and processes. Whether you're an administrator, manager, or employee, Nixies offers a comprehensive suite of tools to facilitate efficient operations. </p>
    <p className='text-[#888] text-[14px] animate-effect'><b className='text-[#5181b2]'>●Scope:</b> The system defines the structured framework, access boundaries, and operational workflows required for managing employee-related activities within the organization. It ensures proper coordination between management, and employees by establishing clear roles and standardized processes across all employee operations.</p>

</div>
    </div>
    </>
  )
}

export default Default