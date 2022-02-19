import React from 'react'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { Auth } from 'aws-amplify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";

export default function ResendConfirmation(props) {
    const {UpdateCardState, UpdateUserName} = props;

    const initialValues = {
        username:''
    }
    
    const validationSchema = Yup.object({
        username :  Yup.string().required("Required Username")
    })
    
    const onSubmit = (values, {resetForm}) => {
    
        ResendConfirmationCode(values.username).then(()=>{
            UpdateUserName(values.username);
            toast.info("Message with activation code sent to your email");
            resetForm();
            UpdateCardState("confirmSignUp");
        }).catch((e)=>{
            toast.error('error signing up: ' + e);
        });
    }
        
    
    async function ResendConfirmationCode(username) {
            
        const { user } = await Auth.resendSignUp(username);
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
                        name='username'
                        placeholder='username'
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
