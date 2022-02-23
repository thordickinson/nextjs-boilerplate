import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { Button } from "antd";

export default function RegisterForm({ UpdateCardState, UpdateUserName }) {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    passwordConfirmation: "",
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Required a Email"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords are not the same!")
      .required("Password confirmation is required!"),
  });

  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    signUp(values.email, values.password)
      .then(() => {
        UpdateUserName(values.email);
        resetForm();
        setLoading(false);
        UpdateCardState("confirmSignUp");
      })
      .catch((e) => {
        if (e.code === "UsernameExistsException") {
          toast.error("Username already exist");
        } else if (e.code === "LimitExceededException") {
          toast.error("Attempt limit exceeded, please try after some time.");
        } else {
          toast.error(`${e.code}`);
        }
        setLoading(false);
      });
  };

  async function signUp(email, password) {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email, // optional
        // optional - E.164 number convention
        // other custom attributes
      },
    });
  }

  return (
    <>
      <div>
        <div className={styles.header}>
          <p className={styles.lead}>Create Account</p>
        </div>
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
                  placeholder="Valid Email"
                  className={styles.input}
                />
                <FormikControl
                  control="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                />
                <FormikControl
                  control="input"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Password Confirmation"
                  className={styles.input}
                />
                <div className={styles.buttonContainer}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!formik.isValid}
                    size="large"
                    loading={loading}
                  >
                    CREATE ACCOUNT
                  </Button>
                  {!formik.isValid ? (
                    <span className={styles.note}>COMPLETE THE FIELDS</span>
                  ) : null}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
