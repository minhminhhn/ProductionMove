import React from "react"
import { Navigate, Redirect, Route, Switch } from 'react-router-dom';
import TruckBtn from '../sub_components/TruckBtn'
import '../../styles/Home.scss'
import { useSelector } from 'react-redux';
import { paths } from './../../untils/constant';
// import { Animation, MDBAnimation } from 'mdbreact';
// import { animated } from 'react-spring'

const Home = (probs) => {
    const subLang = useSelector(state => state.lang)

    function Feature({ img, title, desc }) {
        return (
            <div className="feature">
                <img src={img} />
                <span className="feature-name center">{title}</span>
                <p className="feature-description">{desc}</p>
            </div>
        )
    }

    // (function onScroll() {
    //     let scrollTrigger = 60;
    //     window.onscroll = function () {
    //         // We add pageYOffset for compatibility with IE.
    //         if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
    //             document.querySelector(".navBar").classList.add("onscroll");

    //         } else {
    //             document.querySelector(".navBar").classList.remove("onscroll");
    //         }
    //     };
    // })();

    return (
        <div className="homeContainer">
            <div className="navBar" onChange={(e) => onScrollNavBar(e)}>
                <span className="home title">BigCorp</span>
                <div className="logoContainer">
                    <img className="logo" src="/logo.png" alt="BigCorp Logo" />
                </div>

                <TruckBtn />
            </div>

            <div className="bannerContainer">
                <img className="banner" src="/banner/1642.jpg" alt="banner"></img>
            </div>

            <div className="featureContainer">
                <span className="title center">Our features</span>
                <div className="featureDescription">
                    {/* <MDBAnimation type="zoomOut">
                    <img src="https://mdbootstrap.com/img/logo.webp" alt="Transparent MDB Logo"/>
                </MDBAnimation> */}
                    <Feature
                        className="one"
                        img="/car.png"
                        title="Outstanding design"
                        desc="Designed to be flexible according to all your needs. Create your site with all module position."
                    />
                    <Feature
                        className="two"
                        img="/electric-car.png"
                        title="Outstanding design"
                        desc="Designed to be flexible according to all your needs. Create your site with all module position."
                    />
                    <Feature
                        className="three"
                        img="/maintenance.png"
                        title="Outstanding design"
                        desc="Designed to be flexible according to all your needs. Create your site with all module position."
                    />
                    <Feature
                        className="two"
                        img="/electric-car.png"
                        title="Outstanding design"
                        desc="Designed to be flexible according to all your needs. Create your site with all module position."
                    />
                </div>
            </div>

            <div className="footerContainer">
                <div className="left column">
                    <div className="left-info">
                        <img className="logo" src="/logo.png" alt="BigCorp Logo" />
                        <span className="home title">BigCorp</span>
                        <div className="copyright">Copyright (C) 2022. All rights reserved.</div>
                    </div>

                    <div className="left-subcribe">
                        <span className="subscribe-text">Subscribe to our newsletter</span>
                        <input type="text" placeholder="Email Address" className="email"></input>
                        <label htmlFor="email" className=""></label>
                    </div>
                </div>

                <div className="right column">
                    <span>About</span>
                    <span>Our story</span>
                    <span>Benefits</span>
                    <span>Team</span>
                    <span>Careers</span>
                </div>
            </div>
        </div >
        // <Redirect to={paths.SYSTEM} />
    )
}

export default Home