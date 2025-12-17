import React from "react";


export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 ">
      <div
        className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md animate-notFound "
      >
        <h1 className="text-7xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mt-3">
          The page you are looking for doesn't exist or has been moved.
        </p>


      </div>
    </div>
  );
}
