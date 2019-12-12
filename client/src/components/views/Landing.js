import React, { Fragment } from 'react'

import Hero from "../sections/Hero"
import About from "../sections/About"
import NavBar from "../sections/NavBar"
import Footer from "../sections/Footer"
import GetStarted from "../sections/GetStarted"

/**
 * 
 * Landing page that shows navbar/hero/about/getstarted/footer
 * 
 */
const LandingPage = () => {
    return (
        <Fragment>
            <NavBar />
            <Hero />
            <About />
            <GetStarted />
            <Footer />
        </Fragment>
    )
}

export default LandingPage