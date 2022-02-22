import React from 'react'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { Auth } from 'aws-amplify';
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import {Button} from "antd";
import { debug } from 'console';

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
            if(e.code === "UserNotFoundException"){
                toast.error("Username does not exist");
            }
            else if(e.code === "InvalidParameterException"){
                toast.error("User is already confirmed");
            }
            else if(e.code === "LimitExceededException"){
                toast.error("Attempt limit exceeded, please try after some time.");
            }
        });
    }
    
    async function ResendConfirmationCode(username) {
            
        await Auth.resendSignUp(username);
    }

  return <>
    <div className={styles.header}>
        <p className={styles.lead}>Confirm Account</p>
    </div>
    <div className={styles.messaje}>
        <span>Enter your username to send an activation code to your email</span>
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
