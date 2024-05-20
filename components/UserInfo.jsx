"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserInfo() {
  const { data: session } = useSession();
  const [users,setUsers] =useState([])

  const fetchProducts = async () => {
    try {
      let resUserExists = await axios.get('api/userExists')
      setUsers(resUserExists?.data?.users)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Welcome, <span className="font-bold">{session?.user?.name}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 rounded"
        >
          Log Out
        </button>
      </nav>
      <div className="flex-grow flex flex-col items-center bg-gray-100 p-4">
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6 w-full max-w-4xl">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/2 py-2 px-4">Name</th>
                  <th className="w-1/2 py-2 px-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="bg-gray-100 border-b">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
