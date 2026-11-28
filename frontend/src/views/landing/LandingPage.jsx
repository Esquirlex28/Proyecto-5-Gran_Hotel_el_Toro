import React from 'react'

import {
  LandingHeader,
  LandingHero,
  LandingBooking,
  LandingRooms,
  LandingServices,
  LandingAbout,
  LandingGallery,
  LandingContact,
  LandingFooter,
} from '../../components/landing'

import './landing.scss'

const LandingPage = () => {
  return (
    <div className="hotel-landing">

      <LandingHeader />

      <main>

        <LandingHero />

        <LandingBooking />

        <LandingRooms />

        <LandingServices />

        <LandingAbout />

        <LandingGallery />

        <LandingContact />

      </main>

      <LandingFooter />

    </div>
  )
}

export default LandingPage