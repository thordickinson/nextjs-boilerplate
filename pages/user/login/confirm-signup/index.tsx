import React, {useEffect, useState} from 'react';
import { Auth } from 'aws-amplify';
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { toast } from 'react-toastify';
import { Button } from 'antd';

export default function ConfirmSignUpForm(props) {
const {usernameTemp, UpdateCardState} = props;
const [seconds ,setSeconds] = useState(30);
const [minutes, setMinutes] = useState(0);
const [resendButton, setResendButton] = useState(false);    //false button enable : true button disabled
const [loading, setLoading] = useState(false);
const [miniLoad, setMiniLoad] = useState(false);

var timer;

useEffect(() => {
    timer = setInterval(()=>{
        if(resendButton){
            setSeconds(seconds -1);
        }

        if(seconds <= 0){
            setMinutes(minutes -1);
            if(minutes <= 0){
                setMinutes(0);
            }
            setSeconds(30);
            setResendButton(false);
        }

        if(seconds >= 60){
            setMinutes(minutes + 1);
        }

    }, 1000)

    return ()=> clearInterval(timer);
});


const initialValues = {
    codeConfirmation:''
}

const validationSchema = Yup.object({
    codeConfirmation :  Yup.string().required('No code security provided.')
})

const onSubmit = (values, {resetForm}) => {
    setLoading(true);
    ConfirmSignUp(usernameTemp, values.codeConfirmation).then(()=>{
        toast.success("Account validate succesfull");
        resetForm();
        setLoading(false);
        UpdateCardState("loginForm");
    }).catch((e)=>{
        if(e.code=== "CodeMismatchException"){
            toast.error("The code does not match");
        }
        else if(e.code === "LimitExceededException"){
            toast.error("Attempt limit exceeded, please try after some time.");
        }
        setLoading(false);
    });
}
    

async function ConfirmSignUp(username, code) {
        
    await Auth.confirmSignUp(
        username,
        code
    );
}


function ResendCode(){
    setMiniLoad(true);
    resendConfirmationCode(usernameTemp).then(()=>{
        toast.info("Code sent to email");
        setResendButton(true);
        setMiniLoad(false);
    }).catch((e)=>{
        if(e.code === "LimitExceededException"){
            toast.error("Attempt limit exceeded, please try after some time.");
        }
        toast.error("." + e.code);
        setMiniLoad(false);
    });
}

async function resendConfirmationCode(username) {
    await Auth.resendSignUp(username);
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
                        <Button type='primary' htmlType='submit' disabled={!formik.isValid} size="large" loading={loading}>ACTIVATE ACCOUNT</Button>
                        {!formik.isValid?<span className={styles.note}>COMPLETE THE FIELDS</span>:null}
                        <span className={styles.resendCode}>Don't have your code yet? <Button onClick={ResendCode} type='link' size='small' disabled={resendButton} loading={miniLoad}> Click here</Button></span>
                        {resendButton?<span className={styles.timer}>{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</span>:null}
                    </div>
                </Form>
            }
        }
    </Formik>
  </>
}
