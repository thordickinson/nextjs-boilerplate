import React from 'react';
import {Field, ErrorMessage} from "formik";
import TextError from '../Error';
import styles from "./styles.module.scss";


export default function Input(props) {
    const { name, ...rest} = props;
  return (
      <div className={styles.formControl}>
          <Field className={styles.fieldform} id={name} name={name}{...rest}/>
          <ErrorMessage className={styles.error} name={name} component={TextError}/>
      </div>
  );
}
