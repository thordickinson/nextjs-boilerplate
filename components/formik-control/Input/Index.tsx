import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "../Error";
import styles from "./styles.module.scss";

export default function Input(props) {
  const { name, label, ...rest } = props;
  const { errors, touched } = useFormikContext();
  const showError = errors[name] && touched[name];
  //console.log(`${name}`, showError);
  return (
    <div className={styles.formControl}>
      {label && (
        <div className={styles.labelRow}>
          <label className={styles.label}>{label}</label>
        </div>
      )}
      <Field
        className={`${styles.input} ${showError ? styles.inputError : ""}`}
        id={name}
        name={name}
        {...rest}
      />
      {!showError && <div className={styles.filler}></div>}
      <ErrorMessage
        className={styles.error}
        name={name}
        component={TextError}
      />
    </div>
  );
}
