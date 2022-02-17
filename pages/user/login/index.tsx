import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import LoginForm from './login-form';
import RegisterForm from './register-form';
import ForgotPassword from './forgot-password/indext';
import ForgotPasswordSubmit from './forgot-password-submit';


export default function LoginPage(ssr = true) {
    const [register, setRegister] = useState(false);
    const [cardState, setCardState] = useState(1);

    /*
    useEffect(() => {
        
        //console.log("estado de otp ")
    }, [register]);
    */

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

function UpdatePasswordModule(num){
    setCardState(num);
}

    return <div className={styles.authmain}>
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.col12}>
                <nav className={styles.navbar}>
                    <a href="/" className={styles.navBarBrand}>Brand Name</a>
                    <ul className={styles.navbarNav}>
                        <li className={styles.liItem}><a href="#">Documentation</a></li>
                        <li className={styles.liItem}><a onClick={()=> setCardState(1)}>SignIn</a></li>
                    </ul>
                </nav>
            </div>
            <div className={styles.col8}>
                <div className={styles.detail}>
                    <h2>Everything</h2>
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

                    {cardState === 1 && <LoginForm />}
                    {cardState === 2 && <RegisterForm />}
                    {cardState === 3 && <ForgotPassword UpdatePasswordModule={UpdatePasswordModule}/>}
                    {cardState === 4 && <ForgotPasswordSubmit UpdatePasswordModule={UpdatePasswordModule}/>}

                    <div className={styles.regcontainer}>
                        {(cardState === 1 || cardState === 2) && <div className={styles.forgot}>
                            <a onClick={() => setCardState(3)}>Forgot your password?</a>
                        </div>}
                        
                        {(cardState === 1 || cardState === 3 || cardState === 4) && <div className={styles.register}>
                            dont have an account? <a onClick={() => setCardState(2)}>Register</a>
                        </div>}

                        {(cardState === 2 || cardState === 3 || cardState === 4) && <div className={styles.register}>
                            have an account? <a onClick={() => setCardState(1)}>Login</a>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

}

