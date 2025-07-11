import mongoose from 'mongoose'

const customizationSchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: false
    }
  ],
  description: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Customization = mongoose.model('Customization', customizationSchema)

export default Customization
