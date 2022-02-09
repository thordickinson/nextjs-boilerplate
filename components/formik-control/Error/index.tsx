import React from 'react';
import styles from "./styles.module.scss";

export default function TextError(props) {
  return (
      <div className={styles.error}>
        {props.children}
      </div>
  );
}
