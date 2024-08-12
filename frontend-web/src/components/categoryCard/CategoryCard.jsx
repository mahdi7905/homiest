import React from 'react'
import {Link} from 'react-router-dom'
import './categoryCard.css'



const CategoryCard = ({profession}) => {
   const banner =
    profession === "Carpentry"
      ? require("../../assets/professions/Carpentry.jpg")
      : profession === "Chef"
      ? require("../../assets/professions/Chef.jpg")
      : profession === "Cleaning"
      ? require("../../assets/professions/Cleaner.jpg")
      : profession === "Gardener"
      ? require("../../assets/professions/Gardener.jpg")
      : profession === "Laundry"
      ? require("../../assets/professions/Laundry.jpg")
      : profession === "Masonry"
      ? require("../../assets/professions/Mason.jpg")
      : profession === "Mechanic"
      ? require("../../assets/professions/Mechanic.jpg")
      : profession === "Painter"
      ? require("../../assets/professions/Painter.jpg")
      : profession === "Wiring"
      ? require("../../assets/professions/Wiring.jpg")
      : null;
  return (
    <Link to={`/services?searchTerm=${profession}`} className='category-card'>
        <img src={banner} alt="category" className='category-image' />
        <p>{profession}</p>
    </Link>
  )
}

export default CategoryCard