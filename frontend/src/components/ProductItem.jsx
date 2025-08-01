import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link onClick={()=>scrollTo(0,0)} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className=' overflow-hidden w-40 h-52'>
        {image[0] && (image[0].endsWith('.mp4') || image[0].endsWith('.webm') || image[0].endsWith('.ogg')) ? (
          <video className='hover:scale-110 transition ease-in-out w-full h-full object-cover' src={image[0]} muted loop playsInline />
        ) : (
          <img className='hover:scale-110 transition ease-in-out w-full h-full object-cover' src={image[0]} alt="" />
        )}
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className=' text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
