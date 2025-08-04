import React from 'react'

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-75 animate-pulse"></div>
        <div className="relative bg-white p-8 rounded-lg shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Admin Panel
          </h1>
          <p className="text-gray-600 mb-6">
            Manage your products, orders, and store settings from here
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-blue-800 mb-2">Add Products</h3>
              <p className="text-sm text-blue-600">Add new products to your store</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-green-800 mb-2">View Products</h3>
              <p className="text-sm text-green-600">Manage existing products</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-purple-800 mb-2">Orders</h3>
              <p className="text-sm text-purple-600">Track and manage customer orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
