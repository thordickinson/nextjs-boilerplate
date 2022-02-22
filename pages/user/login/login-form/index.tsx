import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


export default function LoginForm({UpdateCardState}) {

    const router = useRouter();

    const initialValues ={
        username: '',
        password: '',
        rememberme:''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required Username"),
        password: Yup.string().required("Required your Password")
    });

    
    const onSubmit = (values, {resetForm}) => {
        SignIn(values.username, values.password).then(()=>{
            resetForm();
            toast.success("Login Correct, Welcome!");
            router.push("/");
        }).catch((e)=>{
            if(e.code === "UserNotConfirmedException"){
                UpdateCardState("resendConfirmation");
            }
            else if(e.code === "NotAuthorizedException"){
                toast.error("Username or Password incorrect")
            }
            else if(e.code === "UserNotFoundException"){
                toast.error('Username or Password incorrect');
            }
            else if(e.code === "LimitExceededException"){
                toast.error("Attempt limit exceeded, please try after some time.");
            }
        });
    }

    
    async function SignIn(username, password) {
        
        await Auth.signIn({username, password});
    }

    //adaptar las 3 funciones siguientes para el checkbox remember me
    function setcookie(){
        var u =document.getElementById('username').value;
        var p =document.getElementById('password').value;
        //console.log("se establecio el usuario: " + u + " y el password " + p);
        document.cookie="myusrname="+u+";path=http://localhost:3100/user/login/";
        document.cookie="mypswd="+p+";path=http://localhost:3100/user/login/";

        console.log("result: " + document.getElementById('username'));
    }

    function getcookiedata(){

        console.log(document.cookie);
    
        var user=getCookie('myusrname');
        var pswd=getCookie('mypswd');
    
        document.getElementById('username').value = user;
        document.getElementById('password').value = pswd;
    
    }
    
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }


    return <>
        <div className={styles.header}>
            <p className={styles.lead}>Login to your Account</p>
        </div>
        <Formik
            initialValues={initialValues}   
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik =>{
                    return <Form className={styles.containerItems}>
                        <FormikControl
                            control ='input'
                            type='username'
                            name='username'
                            placeholder='Username'
                            className={styles.input}
                        />
                        <FormikControl
                            control = 'input'
                            type = 'password'
                            name='password'
                            placeholder='Password'
                            className={styles.input}
                        />
                        <div className={styles.checkbox}>
                            <Field
                                type="checkbox"
                                id="rememberme"
                                name="rememberme"
                                className={styles.box}
                                onClick={setcookie}
                            />
                        <label htmlFor="rememberme"><span>Remember Me</span></label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button type='primary' htmlType='submit' disabled={!formik.isValid} size="large">LOGIN</Button>
                        {!formik.isValid?<span className={styles.note}>COMPLETE THE FIELDS</span>:null}
                    </div>
                </Form>
                }
            }
        </Formik>
        
    </>
}

