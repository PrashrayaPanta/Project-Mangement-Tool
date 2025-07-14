import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full bg-white rounded-lg shadow p-6 my-6">
            <div className="flex justify-center">
              <h1 className="text-xl font-bold">Welcome to Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;