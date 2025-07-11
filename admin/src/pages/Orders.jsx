import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [visibleCustomization, setVisibleCustomization] = useState(null)
  const navigate = useNavigate()

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
        setOrders(response.data.orders.reverse())
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
  }, [token])

  return (
    <>
      <h3 className="text-lg font-bold mb-4">Orders</h3>
      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcel" />

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
