// import React from 'react';
// import { MdPersonOff } from "react-icons/md";
// import { FaUsers, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

// const SuperCard = ({ data, setData }) => {
//   if (!data) return ;

//   const cards = [
//     {
//       label: "Total Employees",
//       value: data.total,
//       color: "bg-blue-100",
//       icon: <FaUsers size={35} className="text-blue-600" />,
//       key: "total"
//     },
//     {
//       label: "Active Employees",
//       value: data.active,
//       color: "bg-green-100",
//       icon: <FaCheckCircle size={28} className="text-green-600" />,
//       key: "active"
//     },
//     {
//       label: "On Leave" ,
//       value: data.onLeave,
//       color: "bg-yellow-100",
//       icon: <FaExclamationTriangle size={28} className="text-yellow-600" />,
//       key: "onLeave",
//     },
//     {
//       label: "Inactive Employees",
//       value: data.inactive,
//       color: "bg-red-100",
//       icon: <MdPersonOff size={28} className="text-red-600" />,
//       key: "inactive"
//     },
//   ];

//   const handleCardClick = (key) => {
//     setData((prev) => ({
//       ...prev,
//       [key]: prev[key] + 1,
//     }));
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full">

//       {cards.map((card, index) => (
//         <div
//           key={index}
//           onClick={() => handleCardClick(card.key)}
//           className={`rounded-lg ${card.color} h-30 shadow-mg text-black-center p-4 flex flex-col items-center justify-center cursor-pointer relative`}
//         >
// <div className='flex justify-between'>
//               <div className="absolute top-3 left-3">{card.icon}</div>
//           <div className=' '>
//             <div className="text-2xl font-semibold mt-8">{card.value}</div>
//           </div>
// </div>
//           <div className="text-md text-center font-medium">{card.label}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SuperCard;