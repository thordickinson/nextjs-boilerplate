import React from 'react';
import { Auth } from 'aws-amplify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import * as Yup from "yup";


export default function ConfirmSignUpForm(props) {
const {username} = props
    
async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

  return (
    <div>index</div>
  )
}
