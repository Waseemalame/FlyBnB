import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Card';

const FilteredListings = ({ listings }) => {
  const { id } = useParams();

  const newListings = listings.filter(listing => listing.categoryId === id)

  return (
    <div className='listing-container'>
      {newListings.length < 1 && (
        <h2>No listings under this category have been created</h2>
      )}
      {newListings.map(listing => (
        <Card listing={listing}/>
      ))}
    </div>
  )
}

export default FilteredListings
