'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Listings',
   [
     {
      userId: 1,
      title: "Heaven's Door: Pioneertown",
      city: "Pioneertown",
      state: "California",
      country: "United States",
      categoryId: 1,
      type: "Entire home",
      guests: 7,
      beds: 3,
      bedrooms: 3,
      baths: 3,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 899,
      cleaningFee: 200,
      serviceFee: 434,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 1,
      title: "Minimalist Modern Cabin - Amazing Views",
      city: "Yucca Valley",
      state: "California",
      country: "United States",
      categoryId: 1,
      type: "Entire home",
      guests: 7,
      beds: 3,
      bedrooms: 3,
      baths: 3,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 755,
      cleaningFee: 200,
      serviceFee: 125,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 2,
      title: "Tiny home hosted by Leslie & Kelli",
      city: "Temecula",
      state: "California",
      country: "United States",
      categoryId: 6,
      type: "Tiny home",
      guests: 3,
      beds: 2,
      bedrooms: 2,
      baths: 1,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 225,
      cleaningFee: 50,
      serviceFee: 50,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 2,
      title: "All-Glass Modern Joshua Tree Villa with Salt Water Pool/Spa",
      city: "Yucca Valley",
      state: "California",
      country: "United States",
      categoryId: 1,
      type: "Tiny home",
      guests: 2,
      beds: 1,
      bedrooms: 1,
      baths: 1,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 115,
      cleaningFee: 350,
      serviceFee: 972,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 1,
      title: "EAGLE'S WATCH MALIBU- Architectural w/ Ocean View",
      city: "Malibu",
      state: "California",
      country: "United States",
      categoryId: 5,
      type: "Entire home",
      guests: 2,
      beds: 1,
      bedrooms: 1,
      baths: 1,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 1655,
      cleaningFee: 550,
      serviceFee: 672,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 1,
      title: "Private Sage Canyon Cliff House near Mesa Verde.",
      city: "Cortez",
      state: "Colorado",
      country: "United States",
      categoryId: 2,
      type: "Entire Cabin",
      guests: 2,
      beds: 1,
      bedrooms: 1,
      baths: 1,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 1655,
      cleaningFee: 550,
      serviceFee: 672,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 2,
      title: "PRIVATE ISLAND On Gorgeous Flathead Lake Montana!!",
      city: "Somers",
      state: "Montana",
      country: "United States",
      categoryId: 4,
      type: "Entire Home",
      guests: 8,
      beds: 6,
      bedrooms: 4,
      baths: 3,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 1655,
      cleaningFee: 300,
      serviceFee: 1200,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 2,
      title: "Therapy Cabin 2",
      city: "Belize City",
      state: "",
      country: "Belize",
      categoryId: 4,
      type: "Entire Home",
      guests: 8,
      beds: 6,
      bedrooms: 4,
      baths: 3,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 175,
      cleaningFee: 125,
      serviceFee: 125,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 2,
      title: "Red Pine Island, Private Island",
      city: "Ontario",
      state: "",
      country: "Canada",
      categoryId: 4,
      type: "Entire Island",
      guests: 8,
      beds: 6,
      bedrooms: 4,
      baths: 3,
      amenities: ['Pool', 'Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 501,
      cleaningFee: 80,
      serviceFee: 280,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      userId: 2,
      title: "Private Island Retreat Portage Lakes",
      city: "New Franklin",
      state: "Ohio",
      country: "United States",
      categoryId: 4,
      type: "Entire Cabin",
      guests: 4,
      beds: 2,
      bedrooms: 2,
      baths: 1,
      amenities: ['Hot tub', 'Patio', 'Fire pit', 'wifi', 'Outdoor dining area', 'TV'],
      price: 260,
      cleaningFee: 80,
      serviceFee: 260,
      createdAt: new Date(),
      updatedAt: new Date()
   },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Listings', null, {});
  }
};
