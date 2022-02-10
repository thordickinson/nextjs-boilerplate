import React from 'react';
import { Auth } from 'aws-amplify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import * as Yup from "yup";
import styles from "./styles.module.scss";


export default function ConfirmSignUpForm() {

const initialValues = {
    username:'',
    codeConfirmation:''
}

const validationSchema = {
    username: Yup.string().required("Required your Username"),
    codeConfirmation : Yup.string().required('No code security provided.')
}

const onSubmit = (values, {resetForm}) => {
    console.log("datos de envio de codigo" + values);
    confirmSignUp(values.username, values.codeConfirmation);  //validar con un usuario existente
    resetForm();
}
    
async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

  return <Formik
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
                  placeholder='Your Username'
                  className={styles.input}
              />
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

}