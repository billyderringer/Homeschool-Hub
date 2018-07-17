import React from 'react'
import './Splash.css'

function Splash(props) {
    return (
        <div className="container-splash">
            <div id="hero"
                 className="center-all-flex">
                <h1>Made for<br/>
                    <span id="hs-span">Homeschoolers</span><br/>
                    with <span id="lv-span">Love</span></h1>
            </div>
        </div>
    )
}

export default Splash