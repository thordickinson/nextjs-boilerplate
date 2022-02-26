import React, { useState } from "react";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { Button } from "antd";

export default function ForgotPassword({ UpdateCardState }) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Required Username"),
  });

  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    ForgotPassword(values.email)
      .then(() => {
        resetForm();
        toast.info("A code has been sent to your email to reset your password");
        setLoading(false);
        UpdateCardState("forgotSubmitForm");
      })
      .catch((e) => {
        if (e.code === "UserNotFoundException") {
          toast.error("Username does not exist");
        } else if (e.code === "LimitExceededException") {
          toast.error("Attempt limit exceeded, please try after some time.");
        } else {
          toast.error("Invalid Parameter");
        }
        setLoading(false);
      });
  };

  async function ForgotPassword(email) {
    await Auth.forgotPassword(email);
  }

  return (
    <>
      <div className={styles.header}>
        <p className={styles.lead}>Forgot Your Password</p>
      </div>
      <p className={styles.info}>
        Please enter your email here, we'll send you a confirmation code to your
        email so you can update your password
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className={styles.containerItems}>
              <FormikControl
                control="input"
                type="email"
                name="email"
                label= "E-mail"
                placeholder="Your email"
              />
              <div className={styles.buttonContainer}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!formik.isValid}
                  size="large"
                  loading={loading}
                >
                  SUBMIT
                </Button>
                {!formik.isValid ? (
                  <span className={styles.note}>COMPLETE THE FIELDS</span>
                ) : null}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
