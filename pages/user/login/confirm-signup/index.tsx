import React from 'react';
import { Auth } from 'aws-amplify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import * as Yup from "yup";
import styles from "./styles.module.scss";

export default function ConfirmSignUpForm({usernameTemp, setOtpActive}) {

const initialValues = {
    codeConfirmation:''
}

const validationSchema = Yup.object({
    codeConfirmation :  Yup.string().required('No code security provided.')
})

const onSubmit = (values, {resetForm}) => {
    confirmSignUp(usernameTemp, values.codeConfirmation);  //validar con un usuario existente
    resetForm();
}
    
async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
      setOtpActive(false);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

  return <>
    <div className={styles.header}>
        <p className={styles.lead}>Confirm Account</p>
    </div>
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        {
            formik => {
                return <Form className={styles.containerItems}>
                    
                    <FormikControl
                        control ='input'
                        type='username'
                        name='codeConfirmation'
                        placeholder='Code'
                        className={styles.input}
                    />
                    
                    <div className={styles.buttonForm}>
                        <button type="submit" disabled={!formik.isValid}>ACTIVATE ACCOUNT</button>
                    </div>
                </Form>
            }
        }
    </Formik>
  </>
}
