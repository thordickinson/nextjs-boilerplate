import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import ConfirmSignUpForm from './confirm-signup';
import ForgotPassword from './forgot-password/indext';
import ForgotPasswordSubmit from './forgot-password-submit';

export default function LoginPage(ssr = true) {
    
    const [cardState, setCardState] = useState("loginForm");
    const [usernameTemp, setUsernameTemp] = useState(undefined);

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

function UpdateCardState(state){
    setCardState(state);
}

function UpdateUserName(userTemp) {
    setUsernameTemp(userTemp);
}
    return <div  className={styles.authmain}>
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.col12}>
                <nav className={styles.navbar}>
                    <a href="/" className={styles.navBarBrand}>Brand Name</a>
                    <ul className={styles.navbarNav}>
                        <li className={styles.liItem}><a href="#">Documentation</a></li>
                        <li className={styles.liItem}><a onClick={()=> setCardState("loginForm")}>SignIn</a></li>
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

                    {cardState === "loginForm" && <LoginForm UpdateCardState={UpdateCardState} UpdateUserName={UpdateUserName}/>}
                    {cardState === "registerForm" && <RegisterForm UpdateCardState={UpdateCardState} UpdateUserName={UpdateUserName}/>}
                    {cardState === "confirmSignUp" && <ConfirmSignUpForm UpdateCardState={UpdateCardState} usernameTemp={usernameTemp} UpdateUserName={UpdateUserName}/>}
                    {cardState === "forgotForm" && <ForgotPassword UpdateCardState={UpdateCardState}/>}
                    {cardState === "forgotSubmitForm" && <ForgotPasswordSubmit UpdateCardState={UpdateCardState}/>}

                    <div className={styles.regcontainer}>
                        {(cardState === "loginForm" || cardState === "registerForm") && <div className={styles.forgot}>
                            <a onClick={() => setCardState("forgotForm")}>Forgot your password?</a>
                        </div>}
                        
                        {(cardState === "loginForm" || cardState === "forgotForm" || cardState === "forgotSubmitForm" || cardState === "confirmSignUp" || cardState === "resendConfirmation") && <div className={styles.register}>
                            dont have an account? <a onClick={() => setCardState("registerForm")}>Register</a>
                        </div>}

                        {(cardState === "registerForm" || cardState === "forgotForm" || cardState === "forgotSubmitForm" || cardState === "confirmSignUp" || cardState === "resendConfirmation") && <div className={styles.register}>
                            have an account? <a onClick={() => setCardState("loginForm")}>Login</a>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

}

