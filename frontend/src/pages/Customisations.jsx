import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import upload_area from '../assets/upload_area.png'
import { ShopContext } from '../context/ShopContext'

const Customisations = () => {
  const navigate = useNavigate()
  const { setCustomization } = useContext(ShopContext)
  const [numImages, setNumImages] = useState(0)
  const [images, setImages] = useState([])
  const [description, setDescription] = useState('')

  const handleNumImagesChange = (e) => {
    const value = parseInt(e.target.value)
    setNumImages(value)
    setImages(Array(value).fill(null))
  }

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = file
    setImages(newImages)
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('description', description)
      for (let i = 0; i < images.length; i++) {
        if (images[i]) {
          formData.append('image' + i, images[i])
        }
      }
      const productId = window.location.pathname.split('/').pop()
      formData.append('productId', productId)

      const response = await axios.post('http://localhost:4000/api/customization/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        // Update customization data in ShopContext with Cloudinary URLs from response
        setCustomization({
          description,
          images: response.data.customization.images
        })

        // Show a 1 second popup message instead of alert
        const popup = document.createElement('div')
        popup.textContent = 'Customizations saved'
        popup.style.position = 'fixed'
        popup.style.top = '20px'
        popup.style.right = '20px'
        popup.style.backgroundColor = 'rgba(0,0,0,0.7)'
        popup.style.color = 'white'
        popup.style.padding = '10px 20px'
        popup.style.borderRadius = '5px'
        popup.style.zIndex = '1000'
        document.body.appendChild(popup)
        setTimeout(() => {
          document.body.removeChild(popup)
        }, 2000)
      } else {
        alert('Failed to submit customization: ' + response.data.message)
      }
    } catch (error) {
      alert('Error submitting customization: ' + error.message)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Customizations</h1>

      <button
        type="button"
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="mb-6">
        <label htmlFor="numImages" className="block mb-2 font-medium">Number of Images</label>
        <select
          id="numImages"
          value={numImages}
          onChange={handleNumImagesChange}
          className="border px-3 py-2 rounded w-24"
        >
          {[...Array(21).keys()].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {numImages > 0 && (
        <div className="mb-6 flex flex-wrap gap-4">
          {images.map((img, idx) => (
            <label key={idx} htmlFor={`image${idx}`} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover border"
                src={!img ? upload_area : URL.createObjectURL(img)}
                alt={`Upload ${idx + 1}`}
              />
              <input
                type="file"
                id={`image${idx}`}
                hidden
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 font-medium">Describe your Customization</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your Customization details here"
          className="w-full max-w-2xl border px-3 py-2 rounded"
          rows={5}
        />
      </div>

      <button
        type="button"
        className="px-6 py-2 bg-black text-white rounded"
        onClick={handleSubmit}
      >
        Done
      </button>
    </div>
  )
}

export default Customisations
