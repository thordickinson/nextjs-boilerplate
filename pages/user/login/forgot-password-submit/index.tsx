import React, {useState} from 'react';
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import { toast } from 'react-toastify';
import styles from "./styles.module.scss";
import { Button } from 'antd';

export default function ForgotPasswordSubmit({UpdateCardState}) {
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        PasswordSubmit(values.username, values.code, values.newpassword)
        .then(()=>{
            resetForm();
            toast.success("Password reset successful");
            setLoading(false);
            UpdateCardState("loginForm");
        }).catch((e)=>{
            if(e.code === "UserNotFoundException"){
                toast.error('Wrong user');
            }
            else if(e.code === "CodeMismatchException"){
                toast.error('The code does not match');
            }
            else if(e.code === "LimitExceededException"){
                toast.error("Attempt limit exceeded, please try after some time.");
            }
            setLoading(false);
        });
    }

    async function PasswordSubmit(username, code, newpassword) {
        await Auth.forgotPasswordSubmit(username, code, newpassword) as any;
    }

    
  return <>
    <div className={styles.header}>
        <p className={styles.lead}>Update Your Password</p>
    </div>
    <div className={styles.messaje}>
        <span>A code to reset your password has been sent to your email</span>
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
                <div className={styles.buttonContainer}>
                        <Button type='primary' htmlType='submit' disabled={!formik.isValid} size="large" loading={loading}>UPDATE PASSWORD</Button>
                        {!formik.isValid?<span className={styles.note}>COMPLETE THE FIELDS</span>:null}
                    </div>
            </Form>
            }
        }
    </Formik>
</>
}
