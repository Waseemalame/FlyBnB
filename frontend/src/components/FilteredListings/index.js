import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Card';

const FilteredListings = ({ listings }) => {
  // console.log(listings)
  const { id } = useParams();
  console.log(id)

  const newListings = listings.filter(listing => listing.categoryId === id)

  console.log(newListings)
  return (
    <div className='listing-container'>
      {newListings.map(listing => (
        <Card listing={listing}/>
      ))}
    </div>
  )
}

export default FilteredListings
