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
        password: ''
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
                //tomar el username del login para reenviar codigo
                //link de reenviar codigo https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-in
                //cambiar el update cardstate por el confirm sign up
                //añadir el link de reenviar codigo
                //añadir timer para ese link para volver a enviar codigo de activacion
                //link de contador https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
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

