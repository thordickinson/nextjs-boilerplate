import React from 'react';
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import { ToastContainer, toast } from 'react-toastify';
import styles from "./styles.module.scss";

export default function ForgotPassword({UpdatePasswordModule}) {

    const initialValues ={
        username: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required Username")
    });

    
    const onSubmit = (values, {resetForm}) => {
        ForgotPassword(values.username)
        .then(()=>{
            resetForm();
            UpdatePasswordModule(4);
        })
        .catch((err)=>{
            toast.error('Error: ' + err);
            resetForm();
        });
    }

    async function ForgotPassword(username) {
        const {user} = await Auth.forgotPassword(username);
        console.log(user);
    }

  return <>
        <ToastContainer/>
        <div className={styles.header}>
            <p className={styles.lead}>Forgot Your Password</p>
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
                    <div className={styles.buttonForm}>
                        <button type="submit" disabled={!formik.isValid}>SUBMIT</button>
                    </div>
                </Form>
                }
            }
        </Formik>
  </>
}
