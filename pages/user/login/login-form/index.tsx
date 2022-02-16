import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Auth } from "aws-amplify";

import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {

    const [user, setUser] = useState(null);
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
        signIn(values.username, values.password);  //validar con un usuario existente
        resetForm();
    }
    
   

    async function signIn(username, password) {
        
        try {
            const cognitoUser = await Auth.signIn(username, password);
            setUser(cognitoUser);
            router.push("/");
        } catch (error) {
            toast.error('Error signing in, ' + error);
        }
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
                                id="activar"
                                name="checkbox"
                                placeholder=""
                                className={styles.box}
                            />
                        <label htmlFor="activar"><span>Remember Me</span></label>
                    </div>
                    <div className={styles.buttonForm}>
                        <button type="submit" disabled={!formik.isValid}>LOGIN</button>
                    </div>
                </Form>
                }
            }
        </Formik>
        <ToastContainer/>
    </>
}
