import React from 'react';
import Head from 'next/head';
import AddListing from 'containers/AddListing/AddListing';

export default function addHotelPage() {
  return (
    <>
      <Head>
        <title>Add Nails | TripFinder.</title>
      </Head>
      <AddListing />
    </>
  );
}
