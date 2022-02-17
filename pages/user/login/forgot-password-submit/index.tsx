import React from 'react';
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import { ToastContainer, toast } from 'react-toastify';
import styles from "./styles.module.scss";

export default function ForgotPasswordSubmit() {

    const initialValues ={
        username: '',
        code:'',
        newpassword:''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required Username"),
        code: Yup.string().required("Required Code Verification"),
        newpassword: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
    });

    const onSubmit = (values, {resetForm}) => {
        PasswordSubmit(values.username, values.code, values.new_password)
        .then(()=>{
            resetForm();
        }).catch((e)=>{
            toast.error('error signing up: ' + e);
        });
    }

    async function PasswordSubmit(username, code, new_password) {
        const {data} = await Auth.forgotPasswordSubmit(username, code, new_password) as any;
        console.log(data);
    }

    //corregir ya que al enviar el formulario, asi pongamos datos, la contraseña se esta llendo vacia
  return <>
    <ToastContainer/>
    <div className={styles.header}>
        <p className={styles.lead}>Update Your Password</p>
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
                        control ='input'
                        type='code'
                        name='code'
                        placeholder='Code Security'
                        className={styles.input}
                    />
                    <FormikControl
                        control ='input'
                        type='password'
                        name='newpassword'
                        placeholder='New Password'
                        className={styles.input}
                    />
                <div className={styles.buttonForm}>
                    <button type="submit" disabled={!formik.isValid}>UPDATE PASSWORD</button>
                </div>
            </Form>
            }
        }
    </Formik>
</>
}
