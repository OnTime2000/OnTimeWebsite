import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [visibleCustomization, setVisibleCustomization] = useState(null)
  const [sortBy, setSortBy] = useState('newest')
  const [totalOrders, setTotalOrders] = useState(0)

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        let sortedOrders = [...response.data.orders]
        
        // Add order numbers
        sortedOrders = sortedOrders.map((order, index) => ({
          ...order,
          orderNumber: index + 1
        }))
        
        // Sort based on selected criteria
        switch(sortBy) {
          case 'newest':
            sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
          case 'oldest':
            sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date))
            break
          case 'month':
            sortedOrders.sort((a, b) => {
              const dateA = new Date(a.date)
              const dateB = new Date(b.date)
              return dateB.getMonth() - dateA.getMonth() || dateB.getFullYear() - dateA.getFullYear()
            })
            break
          case 'year':
            sortedOrders.sort((a, b) => {
              const yearA = new Date(a.date).getFullYear()
              const yearB = new Date(b.date).getFullYear()
              return yearB - yearA
            })
            break
          default:
            sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
        }
        
        setOrders(sortedOrders)
        setTotalOrders(sortedOrders.length)
      } else {
        toast.error(response.data.message || 'Failed to fetch orders')
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching orders')
    }
  }

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Order status updated')
        await fetchAllOrders()
      } else {
        toast.error(response.data.message || 'Failed to update status')
      }
    } catch (error) {
      toast.error(error.message || 'Error updating status')
    }
  }

  // Update payment status
  const paymentHandler = async (orderId, newPaymentStatus, orderStatus) => {
    if (newPaymentStatus && orderStatus !== 'Delivered') {
      toast.error('You can only mark payment as Done after delivery.')
      return
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/payment-status`,
        { orderId, payment: newPaymentStatus },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Payment status updated')
        await fetchAllOrders()
      } else {
        toast.error(response.data.message || 'Failed to update payment status')
      }
    } catch (error) {
      toast.error(error.message || 'Error updating payment status')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token, sortBy])

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-bold">Orders</h3>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">
            Total Orders: <span className="text-lg font-bold">{totalOrders}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-1 rounded-md text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="month">By Month</option>
              <option value="year">By Year</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <div className="flex flex-col items-center">
              <img className="w-12 mb-2" src={assets.parcel_icon} alt="parcel" />
              <span className="text-xs text-gray-500">Order</span>
              <span className="text-lg font-bold text-lg">#{order.orderNumber}</span>
            </div>

            {/* Order Details */}
            <div>
              <div className="flex flex-wrap gap-1">
                {order.items.map((item, index) => (
                  <p key={item._id} className="font-semibold">
                    {item.name}
                    {index < order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-1 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            {/* Payment + Method */}
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-2">Method: {order.paymentMethod}</p>

              {order.paymentMethod === 'COD' ? (
                <div>
                  <p className="mt-1">Payment:</p>
                  <select
                    value={order.payment ? 'Done' : 'Pending'}
                    onChange={(e) =>
                      paymentHandler(order._id, e.target.value === 'Done', order.status)
                    }
                    className="p-1 rounded border"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Done" disabled={order.status !== 'Delivered'}>
                      Done {order.status !== 'Delivered' ? '(Disabled)' : ''}
                    </option>
                  </select>
                </div>
              ) : (
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              )}

              <p className="mt-2">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="text-sm sm:text-[15px]">
              ₹
              {order.amount}
            </p>

            {/* Status + Customisation Button */}
            <div>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 font-semibold w-full"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              {order.items.map((item) => (
                <button
                  key={item._id}
                  className="mt-3 w-full bg-black text-white text-sm py-1 px-4 rounded hover:bg-gray-800"
                  onClick={() => setVisibleCustomization(order.customization)}
                >
                  View Customisation
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {visibleCustomization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded max-w-lg w-full relative">
            <button
              className="absolute top-1 right-1 text-gray-600 hover:text-gray-900 text-3xl font-bold"
              onClick={() => setVisibleCustomization(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Customization Details</h2>
            <p className="mb-2"><strong>Description:</strong> {visibleCustomization.description}</p>
            <div className="flex flex-wrap gap-2">
              {visibleCustomization.images && visibleCustomization.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Customization ${idx + 1}`}
                  className="w-40 h-40 object-cover border"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Orders
