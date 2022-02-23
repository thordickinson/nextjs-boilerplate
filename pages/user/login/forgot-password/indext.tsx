import React, {useState} from 'react';
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import { toast } from 'react-toastify';
import styles from "./styles.module.scss";
import { Button } from 'antd';

export default function ForgotPassword({UpdateCardState}) {
    const [loading, setLoading] = useState(false);
    const initialValues ={
        username: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required Username")
    });

    
    const onSubmit = (values, {resetForm}) => {
        setLoading(true);
        ForgotPassword(values.username)
        .then(()=>{
            resetForm();
            toast.info("A code has been sent to your email to reset your password");
            setLoading(false);
            UpdateCardState("forgotSubmitForm");
        })
        .catch((e)=>{
            if(e.code === "UserNotFoundException"){
                toast.error("Username does not exist");
            }
            else if(e.code === "LimitExceededException"){
                toast.error("Attempt limit exceeded, please try after some time.");
            }
            else{
                toast.error("Invalid Parameter");
            }
            setLoading(false);
        });
    }

    async function ForgotPassword(username) {
        await Auth.forgotPassword(username);
    }

  return <>
        
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
                    <div className={styles.buttonContainer}>
                        <Button type='primary' htmlType='submit' disabled={!formik.isValid} size="large" loading={loading}>SUBMIT</Button>
                        {!formik.isValid?<span className={styles.note}>COMPLETE THE FIELDS</span>:null}
                    </div>
                </Form>
                }
            }
        </Formik>
  </>
}
