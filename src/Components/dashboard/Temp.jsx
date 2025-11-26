// import React, { useState, useEffect } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// const Temp = ({ onSubmit }) => {
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     start: '',
//     end: '',
//     status: '',
//     user: '',
//     client: '',
//     notes: '',
//   });

//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     const requiredFilled =
//       form.title &&
//       form.description &&
//       form.start &&
//       form.end &&
//       form.status &&
//       form.user &&
//       form.client;
//     const datesValid = form.start && form.end && form.end >= form.start;

//     setIsValid(requiredFilled && datesValid);
//   }, [form]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e, close) => {
//     e.preventDefault();
//     if (isValid) {
//       const newProject = {
//         project: form.title,
//         status: form.status,
//         user: form.user,
//         client: form.client,
//         description: form.description,
//         start: form.start,
//         end: form.end,
//         notes: form.notes,
//       };

//       onSubmit(newProject);
//       close();
//       setForm({
//         title: '',
//         description: '',
//         start: '',
//         end: '',
//         status: '',
//         user: '',
//         client: '',
//         notes: '',
//       });
//     }
//   };

//   return (
//     <Popup
//       trigger={
//         <button className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700 transition-all">
//           + Create
//         </button>
//       }
//       modal
//       nested
//     >
//       {close => (
//         <div className="flex justify-center items-center min-h-screen px-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[85vh] overflow-y-auto p-6">
//             <h2 className="text-xl font-bold mb-4">Create New Project</h2>

//             <form onSubmit={e => handleSubmit(e, close)} className="space-y-4">

//               <div>
//                 <label className="block font-medium mb-1">Project Title*</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={form.title}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   placeholder=" "
//                 />
//               </div>

              
//               <div>
//                 <label className="block font-medium mb-1">Description*</label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-3 py-2 rounded resize-y"
//                   placeholder=""
//                 />
//               </div>

              
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="block font-medium mb-1">Start Date*</label>
//                   <input
//                     type="date"
//                     name="start"
//                     value={form.start}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-300 px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block font-medium mb-1">End Date*</label>
//                   <input
//                     type="date"
//                     name="end"
//                     value={form.end}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-300 px-3 py-2 rounded"
//                   />
//                   {form.end && form.start && form.end < form.start && (
//                     <p className="text-red-600 text-sm mt-1">End date must be after Start date.</p>
//                   )}
//                 </div>
//               </div>

             
//               <div>
//                 <label className="block font-medium mb-1">Status*</label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                 >
//                   <option value="">Select status</option>
//                   <option value="planning">Planning</option>
//                   <option value="On Going">On Going</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>

            
//               {form.status === 'completed' && (
//                 <div>
//                   <label className="block font-medium mb-1">Completion Notes</label>
//                   <textarea
//                     name="notes"
//                     value={form.notes}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 px-3 py-2 rounded resize-y"
//                   />
//                 </div>
//               )}

              
//               <div>
//                 <label className="block font-medium mb-1">Project User*</label>
//                 <input
//                   type="text"
//                   name="user"
//                   value={form.user}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   placeholder=" "
//                 />
//               </div>

             
//               <div>
//                 <label className="block font-medium mb-1">Project Client*</label>
//                 <input
//                   type="text"
//                   name="client"
//                   value={form.client}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   placeholder=""
//                 />
//               </div>

            
//               <div className="flex justify-end gap-4 pt-2">
//                 <button
//                   type="button"
//                   onClick={close}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={!isValid}
//                   className={`px-4 py-2 text-white rounded transition ${
//                     isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </Popup>
//   );
// };

// export default Temp;
