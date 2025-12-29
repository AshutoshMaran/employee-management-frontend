// import React from "react";

// function ProjectTeamList({ projects, allEmployees }) {
//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">📂 Assigned Projects</h3>

//       {projects.length === 0 ? (
//         <p className="text-gray-500 text-center bg-white p-4 border rounded shadow-sm">
//           No projects assigned yet.
//         </p>
//       ) : (
//         projects.map((project, idx) => (
//           <div
//             key={idx}
//             className="mb-8 p-4 bg-white border rounded shadow-md"
//           >
//             <h4 className="text-lg font-semibold text-blue-700 mb-2">{project.projectName}</h4>

//             <p className="text-gray-600 mb-2">{project.description}</p>
//             <div className="text-sm text-gray-700 mb-4">
//               <p><strong>Start Date:</strong> {project.startDate}</p>
//               <p><strong>End Date:</strong> {project.endDate}</p>
//             </div>

//             <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//               <table className="min-w-full table-auto text-sm rounded-lg overflow-hidden">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="px-4 py-2 border-b border-gray-300 rounded-tl-lg">S.No</th>
//                     <th className="px-4 py-2 border-b border-gray-300">Employee ID</th>
//                     <th className="px-4 py-2 border-b border-gray-300">Employee Name</th>
//                     <th className="px-4 py-2 border-b border-gray-300">Email</th>
//                     <th className="px-4 py-2 border-b border-gray-300 rounded-tr-lg">Role</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project.teamMembers.map((member, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-50 even:bg-gray-50"
//                     >
//                       <td className="px-4 py-2 border-b border-gray-200 text-center">{index + 1}</td>
//                       <td className="px-4 py-2 border-b border-gray-200">{member.employeeId}</td>
//                       <td className="px-4 py-2 border-b border-gray-200">
//                         <select
//                           className="w-full px-2 py-1 border border-gray-300 rounded"
//                           value={member.name}
//                           onChange={() => {}}
//                         >
//                           {allEmployees.map((emp, i) => (
//                             <option key={i} value={emp.name}>
//                               {emp.name}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="px-4 py-2 border-b border-gray-200">{member.email}</td>
//                       <td className="px-4 py-2 border-b border-gray-200">{member.role}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default ProjectTeamList;
