import React from 'react';
import { Auth } from 'aws-amplify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { toast } from 'react-toastify';
import { Button } from 'antd';

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
        toast.success("Account validate succesfull");
        resetForm();
        UpdateCardState("loginForm");
    }).catch((e)=>{
        if(e.code=== "CodeMismatchException"){
            toast.error("The code does not match");
        }
        else if(e.code === "LimitExceededException"){
            toast.error("Attempt limit exceeded, please try after some time.");
        }
    });
}
    

async function ConfirmSignUp(username, code) {
        
    await Auth.confirmSignUp(
        username,
        code
    );
}



  return <>
    <div className={styles.header}>
        <p className={styles.lead}>Confirm Account</p>
    </div>
    <div className={styles.messaje}>
        <span>A code to activate your account has been sent to your email</span>
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
                    
                    <div className={styles.buttonContainer}>
                        <Button type='primary' htmlType='submit' disabled={!formik.isValid} size="large">ACTIVATE ACCOUNT</Button>
                        {!formik.isValid?<span className={styles.note}>COMPLETE THE FIELDS</span>:null}
                    </div>
                </Form>
            }
        }
    </Formik>
  </>
}
