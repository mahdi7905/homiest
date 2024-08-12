import React from 'react'
import './category.css'
import CategoryCard from '../../components/categoryCard/CategoryCard'

const Categories = () => {
  const professions = [
    "Mechanic",
    "Gardener",
    "Painter",
    "Chef",
    "Masonry",
    "Cleaning",
    "Laundry",
    "Wiring",
    "Carpentry",
  ];
  return (
    <div className='category-container'>
      <div className='inner-category'>
        {
          professions.map(profession => <CategoryCard profession={profession} key={profession}/>)
        }
      </div>
    </div>
  )
}

export default Categories