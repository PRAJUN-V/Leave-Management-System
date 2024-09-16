import React, { useEffect, useState } from 'react';
import Header from './common/Header';
import { SideBar } from './common/Sidebar';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {

  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-grow flex flex-col">
          <Header />
          <div className="p-4 flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
