import React from 'react';
import { Auth } from 'aws-amplify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { toast } from 'react-toastify';

export default function ConfirmSignUpForm(props) {
const {usernameTemp, UpdateCardState} = props;

const initialValues = {
    codeConfirmation:''
}

const validationSchema = Yup.object({
    codeConfirmation :  Yup.string().required('No code security provided.')
})

const onSubmit = (values, {resetForm}) => {

    ConfirmSignUp(usernameTemp, values.codeConfirmation).then(()=>{
        resetForm();
        UpdateCardState("loginForm");
    }).catch((e)=>{
        toast.error('error signing up: ' + e);
    });
}
    

async function ConfirmSignUp(username, code) {
        
    const { user } = await Auth.confirmSignUp(
        username,
        code
    );
    console.log(user);
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
