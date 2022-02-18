import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import ConfirmSignUpForm from '../confirm-signup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm({UpdateCardState, UpdateUserName}) {

    const [usernameTemp, setUsernameTemp] = useState(undefined);

    const initialValues ={
        username: '',
        password: '',
        passwordConfirmation: '',
        email: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required a Username"),
        password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password")], 'Passwords are not the same!')
            .required('Password confirmation is required!'),
        email: Yup.string().email("Invalid Email Format").required("Required a Email")
    });

    

    const onSubmit = (values, {resetForm}) => {
        //console.log("form data signup " + values);
        signUp(values.username, values.password, values.email).then(()=>{
            UpdateUserName(values.username);
            UpdateCardState('confirmSignUp');
            resetForm();
        }).catch((e)=>{
            toast.error('error signing up: ' + e);
        });
    }

    

    async function signUp(username, password, email) {
        
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
    }

    return <>
    <div>
        <div className={styles.header}>
        <p className={styles.lead}>Create Account</p>
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
                        placeholder='Username'
                        className={styles.input}
                    />
                    <FormikControl
                        control ='input'
                        type='password'
                        name='password'
                        placeholder='Password'
                        className={styles.input}
                    />
                    <FormikControl
                        control ='input'
                        type='password'
                        name='passwordConfirmation'
                        placeholder='Password Confirmation'
                        className={styles.input}
                    />
                    <FormikControl
                        control ='input'
                        type='email'
                        name='email'
                        placeholder='Valid Email'
                        className={styles.input}
                    />
                    <div className={styles.buttonForm}>
                        <button type="submit" disabled={!formik.isValid}>CREATE ACCOUNT</button>
                    </div>
                </Form>
            }
        }
    </Formik>
    </div>
    </>
}
