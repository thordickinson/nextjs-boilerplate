import React, {useEffect, useState} from 'react';
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


export default function LoginForm({UpdateCardState, UpdateUserName}) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const initialValues ={
        username: '',
        password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required Username"),
        password: Yup.string().required("Required your Password")
    });

    
    const onSubmit = (values, {resetForm}) => {
        setLoading(true);
        SignIn(values.username, values.password).then(()=>{
            UpdateUserName(values.username);
            toast.success("Login Correct, Welcome!");
            setLoading(false);
            router.push("/");
        }).catch((e)=>{
            if(e.code === "UserNotConfirmedException"){
                ResendConfirmationCode(values.username);
                toast.info("Unconfirmed account");
                UpdateCardState("confirmSignUp");
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
            setLoading(false);
        });
    }

    
    async function SignIn(username, password) {
        
        await Auth.signIn({username, password});
    }

    async function ResendConfirmationCode(username) {
            
        await Auth.resendSignUp(username);
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
                        <Button type='primary' htmlType='submit' disabled={!formik.isValid} size="large" loading={loading}>LOGIN</Button>
                        {!formik.isValid?<span className={styles.note}>COMPLETE THE FIELDS</span>:null}
                    </div>
                </Form>
                }
            }
        </Formik>
        
    </>
}

