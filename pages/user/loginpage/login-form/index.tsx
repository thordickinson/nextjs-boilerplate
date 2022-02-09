import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Auth } from "aws-amplify";

export default function LoginForm() {

    const initialValues ={
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Required Email"),
        password: Yup.string().required("Required your Password")
    });

    const onSubmit = (values, {resetForm}) => {
        console.log("form data " + values);
        signIn(values.email, values.password);  //validar con un usuario existente
        resetForm();
    }

    async function signIn(email, password) {
        try {
            const user = await Auth.signIn(email, password);
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    return <>
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
                            type='email'
                            name='email'
                            placeholder='Email'
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
    </>
}
