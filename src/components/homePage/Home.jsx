import React from 'react'
import CallToAction from './CallToAction'
import Features from './Features'
import Getstarted from './Getstarted'
import Herosection from './Herosection'
import Testimonials from './Testimonials'
function Home() {
    return (
        <div>
            <Herosection />
            <Getstarted/>
            <Features/>
            <Testimonials/>
            <CallToAction/>
        </div>
    )
}

export default Home
