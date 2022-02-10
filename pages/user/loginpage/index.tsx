import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import LoginForm from './login-form';
import RegisterForm from './register-form';
import ConfirmSignUpForm from './confirm-signup';

export default function LoginPage(ssr = true) {
    const [register, setRegister] = useState(false);
    const [otpActive, setOtpActive] = useState(false);  //para controlar si muestra o no la pagina de OTP

    

    useEffect(() => {
        
        console.log("estado de otp " + otpActive)
    }, [register, otpActive]);

    const services = [
        { service: "Your Dashoboard" },
        { service: "Your Application" },
        { service: "Your Client" },
        { service: "Your Admin" },
        { service: "Your Proyect" }
    ];

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return otpActive?<ConfirmSignUpForm />:
<div className={styles.authmain}>
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.col12}>
                <nav className={styles.navbar}>
                    <a href="#" className={styles.navBarBrand}>Brand Name</a>
                    <ul className={styles.navbarNav}>
                        <li className={styles.liItem}><a href="#">Documentation</a></li>
                        <li className={styles.liItem}><a href="#">SignUp</a></li>
                    </ul>
                </nav>
            </div>
            <div className={styles.col8}>
                <div className={styles.detail}>
                    <h2>Everithing</h2>
                    <h2>you need for</h2>
                    <h2>
                        <Carousel
                            arrows={false}
                            responsive={responsive}
                            autoPlay={true}
                            ssr={ssr}
                            infinite={true}
                            autoPlaySpeed={3000}
                            className={styles.carousel}
                            swipeable={false}
                        >
                            {services.map((t, i) => <div key={i} className={styles.carouselItem}>{t.service}</div>)}
                        </Carousel>
                    </h2>
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                </div>
            </div>
            <div className={styles.col4}>
                <div className={styles.card}>
                    {!register ? <div className={styles.header}>
                        <p className={styles.lead}>Login to your Account</p>
                    </div>
                        :
                        <div className={styles.header}>
                            <p className={styles.lead}>Create Account</p>
                        </div>}
                        
                    {!register?<LoginForm/>:<RegisterForm setOtpActive ={setOtpActive}/>}

                    <div className={styles.regcontainer}>
                        <div className={styles.forgot}>
                            <a href="#">Forgot your password?</a>
                        </div>
                        {register ? <div className={styles.register}>
                            have an account? <a onClick={() => setRegister(false)}>Login</a>
                        </div> : <div className={styles.register}>
                            dont have an account? <a onClick={() => setRegister(true)}>Register</a>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}

