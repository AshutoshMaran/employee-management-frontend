// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { apiurl } from '../../appUrl';

// const Addemployeeform = () => {
// const { register, handleSubmit, watch, formState: { errors: formErrors, isSubmitting } } = useForm();
// const [submitError, setSubmitError] = useState('');
// const [successMessage, setSuccessMessage] = useState('');
// const  [file,setfile]=useState([]);

// // const OtherDocumentFiles = watch('OtherDocuments');

// const handlefile = (e) => {
// const selectfiles=e.target.files;
// console.log(selectfiles)
// const fiesarray=[];
// for(let i=0;i<selectfiles.length;i++){
//   fiesarray.push(selectfiles[i]);
// }
// console.log(fiesarray)
// setfile(fiesarray);
// }

// const renderError = (field) => {
//   if (formErrors[field]) {
//     return <p className="text-red-500 text-sm mt-1">{formErrors[field].message || 'This field is required'}</p>;
//   }
//   return null;
// };

// const onSubmit = async (data) => {

//   console.log(data)
//   try {
//     setSubmitError('');
//     setSuccessMessage('');

//     const formData = new FormData();

//     for (const key in data) {
//       if (data[key] instanceof FileList) {
//         Array.from(data[key]).forEach((file) => {
//           formData.append(key, file);
//         });
//       } else {
//         formData.append(key, data[key]);
//       }
//     }

//     const res = await axios.post(apiurl+'add-employee', formData, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }

//     });
//     console.log(res)

//     setSuccessMessage('Form submitted successfully!');
//   } catch (error) {
//     setSubmitError('Something went wrong.');
//     console.log(error);
//   }
// };

//   return (

//     <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto my-10">

//       <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Add Employee</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[

//             { id: "employeeId", label: "Employee ID", type:"text", rules: {
//     required: "Employee ID is required",
//     pattern: {
//       value: /^[a-zA-Z0-9]+$/,
//       message: "Only letters and numbers are allowed",
//     }
// }},
// { id: "firstName", label: "First Name", type:"text", rules: { required: "First name is required" }},
// { id: "lastName", label: "Last Name", type:"text", rules: { required: "Last name is required" }},
// { id: "dateOfJoining", label: "Date of Joining" ,  type: "date", rules: { required: "Date of joining is required" }},
// {
//   id: "mobileNo",
//   label: "Mobile No",
//   type: "text",
//   rules: {
//     required: "Mobile number is required",
//     pattern: {
//       value: /^[0-9]{10}$/,
//       message: "Enter a valid 10-digit mobile number",
//     },
//   },
// }
// ,
// { id: "email", label: "Email ID", type: "email", rules: {
//     required: "Email is required",
//     pattern: {
//       value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
//       message: "Enter a valid email address",
//     }
// }},
// { id: "department", label: "Department", type:"text", rules: { required: "Department is required" }},
// { id: "position", label: "Position", type:"text", rules: { required: "Position is required" }},
// // { id: "OtherDocuments", label: "Other Documents", type:"file", rules: { required: "Other Documents is required" }},

//           ].map(({ id, label, type,rules  }) => (
//             <div key={id}>
//               <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
//                 {label}
//                  {rules?.required && <span className="text-red-500"> *</span>}
//               </label>
//               <input
//                 id={id}
//                 type={type}
//                 {...register(id,rules )}
//                 className={`block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   formErrors[id] ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {renderError(id)}
//             </div>
//           ))}

//           <div>
//             <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
//               Education <span className="text-red-500">*</span>
//             </label>
//             <select
//               id="education"
//               {...register("education",{ required: "Education is required" })}
//               className={`block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 formErrors.education ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <option value="">Select Education</option>
//               <option value="highschool">High School</option>
//               <option value="bachelor">Bachelor's</option>
//               <option value="master">Master's</option>
//             </select>
//             {renderError("education")}
//           </div>
//         </div>

//         <div>
//           <label htmlFor="educationCertificate" className="block text-sm font-medium text-gray-700 mb-1">
//             Education Certificate <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="educationCertificate"
//             type="file"
//             accept=".pdf, .jpg"
//             {...register("educationCertificate",{ required: "Education certificate is required",validate: {
//         allowedTypes: (value) => {
//           const file = value?.[0];
//           if (!file) return true;
//           const allowedTypes = ['application/pdf', 'image/jpeg'];
//           return allowedTypes.includes(file.type) || "Only PDF or JPG files are allowed";
//         }} })}
//             className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//           {renderError("educationCertificate")}
//         </div>

//         <div>
//           <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//             Address <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             id="address"
//             rows={3}
//             {...register("address",{ required: "Address is required" })}
//             className={`block w-full rounded-md border px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               formErrors.address ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {renderError("address")}
//         </div>

//         <div>
//           <label htmlFor="addressProof" className="block text-sm font-medium text-gray-700 mb-1">
//             Address Proof <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="addressProof"
//             type="file"
//             accept=".pdf, .jpg"
//             {...register("addressProof",{ required: "Address Proof is required",validate: {
//         allowedTypes: (value) => {
//           const file = value?.[0];
//           if (!file) return true;
//           const allowedTypes = ['application/pdf', 'image/jpeg'];
//           return allowedTypes.includes(file.type) || "Only PDF or JPG files are allowed";
//         }} },)}
//             className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//           {renderError("addressProof")}
//         </div>

// <div>
//         <label htmlFor="OtherDocument"className="block text-sm font-medium text-gray-700 mb-1">
//           Other Documents
//         </label>
//         <input
//         id="OtherDocument"
//         type="file"
//         multiple
//         accept=".pdf, .jpg"
//         onChange={handlefile} />
//         {file.length>0&&(
//           <ul>
//             {file.map((f,idx)=>(
//               <li key={idx}>{f.name}</li>
//             ))}
//           </ul>
//         )}
//       </div>

//         {submitError && <p className="text-red-600 text-center">{submitError}</p>}
//         {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition duration-300 disabled:bg-blue-300"
//         >
//           {isSubmitting ? "Submitting..." : "Submit for Approval"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Addemployeeform

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiurl } from "../../appUrl";
import { useLocation } from "react-router-dom";

const Addemployeeform = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm();
  const is_super = useLocation().pathname.includes("super")
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setfile] = useState([]);

  // const OtherDocumentFiles = watch('OtherDocuments');

  const handlefile = (e) => {
    const selectfiles = e.target.files;
    console.log(selectfiles);
    const fiesarray = [];
    for (let i = 0; i < selectfiles.length; i++) {
      fiesarray.push(selectfiles[i]);
    }
    console.log(fiesarray);
    setfile(fiesarray);
  };

  const renderError = (field) => {
    if (formErrors[field]) {
      return (
        <p className="text-red-500 text-sm mt-1">
          {formErrors[field].message || "This field is required"}
        </p>
      );
    }
    return null;
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setSubmitError("");
      setSuccessMessage("");

      const formData = new FormData();

      for (const key in data) {
        if (data[key] instanceof FileList) {
          Array.from(data[key]).forEach((file) => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, data[key]);
        }
      }

      if (file.length > 0) {
        file.forEach((f) => formData.append("OtherDocuments", f));
      }

const res = await axios.post(apiurl + (is_super ? "add-employee-super" : "add-employee"), formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true, 
});




      // console.log(res)

      setSuccessMessage("Form submitted successfully!");
    } catch (error) {
      setSubmitError("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Add Employee
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              id: "employeeId",
              label: "Employee ID",
              type: "text",
              rules: {
                required: "Employee ID is required",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Only letters and numbers are allowed",
                },
              },
            },
            {
              id: "firstName",
              label: "First Name",
              type: "text",
              rules: { required: "First name is required" },
            },
            {
              id: "lastName",
              label: "Last Name",
              type: "text",
              rules: { required: "Last name is required" },
            },
            {
              id: "dateOfJoining",
              label: "Date of Joining",
              type: "date",
              rules: { required: "Date of joining is required" },
            },
            {
              id: "mobileNo",
              label: "Mobile No",
              type: "text",
              rules: {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              },
            },
            {
              id: "email",
              label: "Email ID",
              type: "email",
              rules: {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email address",
                },
              },
            },
            {
              id: "department",
              label: "Department",
              type: "text",
              rules: { required: "Department is required" },
            },
            {
              id: "position",
              label: "Position",
              type: "text",
              rules: { required: "Position is required" },
            },
            // { id: "OtherDocuments", label: "Other Documents", type:"file", rules: { required: "Other Documents is required" }},
          ].map(({ id, label, type, rules }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
                {rules?.required && <span className="text-red-500"> *</span>}
              </label>
              <input
                id={id}
                type={type}
                {...register(id, rules)}
                className={`block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors[id] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {renderError(id)}
            </div>
          ))}

          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Education <span className="text-red-500">*</span>
            </label>
            <select
              id="education"
              {...register("education", { required: "Education is required" })}
              className={`block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.education ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Education</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's</option>
              <option value="master">Master's</option>
            </select>
            {renderError("education")}
          </div>
        </div>

        <div>
          <label
            htmlFor="educationCertificate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Education Certificate <span className="text-red-500">*</span>
          </label>
          <input
            id="educationCertificate"
            type="file"
            accept=".pdf, .jpg"
            {...register("educationCertificate", {
              required: "Education certificate is required",
              validate: {
                allowedTypes: (value) => {
                  const file = value?.[0];
                  if (!file) return true;
                  const allowedTypes = ["application/pdf", "image/jpeg"];
                  return (
                    allowedTypes.includes(file.type) ||
                    "Only PDF or JPG files are allowed"
                  );
                },
              },
            })}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {renderError("educationCertificate")}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            rows={3}
            {...register("address", { required: "Address is required" })}
            className={`block w-full rounded-md border px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {renderError("address")}
        </div>

        <div>
          <label
            htmlFor="addressProof"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Proof <span className="text-red-500">*</span>
          </label>
          <input
            id="addressProof"
            type="file"
            accept=".pdf, .jpg"
            {...register("addressProof", {
              required: "Address Proof is required",
              validate: {
                allowedTypes: (value) => {
                  const file = value?.[0];
                  if (!file) return true;
                  const allowedTypes = ["application/pdf", "image/jpeg"];
                  return (
                    allowedTypes.includes(file.type) ||
                    "Only PDF or JPG files are allowed"
                  );
                },
              },
            })}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {renderError("addressProof")}
        </div>

        <div>
          <label
            htmlFor="OtherDocuments"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Other Documents
          </label>
          <input
            id="OtherDocuments"
            type="file"
            multiple
            accept=".pdf, .jpg"
            onChange={handlefile}
            {...register("OtherDocuments")}
          />
          {file.length > 0 && (
            <ul>
              {file.map((f, idx) => (
                <li key={idx}>{f.name}</li>
              ))}
            </ul>
          )}
        </div>

        {submitError && (
          <p className="text-red-600 text-center">{submitError}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-center">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition duration-300 disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
};

export default Addemployeeform;
