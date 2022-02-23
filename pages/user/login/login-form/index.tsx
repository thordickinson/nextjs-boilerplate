import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { Button } from "antd";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function LoginForm({ UpdateCardState, UpdateUserName }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Required Email"),
    password: Yup.string().required("Required your Password"),
  });

  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    SignIn(values.email, values.password)
      .then(() => {
        UpdateUserName(values.email);
        toast.success("Login Correct, Welcome!");
        setLoading(false);
        router.push("/");
      })
      .catch((e) => {
        if (e.code === "UserNotConfirmedException") {
          ResendConfirmationCode(values.email);
          toast.info("Unconfirmed account");
          UpdateCardState("confirmSignUp");
        } else if (e.code === "NotAuthorizedException") {
          toast.error("Username or Password incorrect");
        } else if (e.code === "UserNotFoundException") {
          toast.error("Username or Password incorrect");
        } else if (e.code === "LimitExceededException") {
          toast.error("Attempt limit exceeded, please try after some time.");
        }
        setLoading(false);
      });
  };

  async function SignIn(email, password) {
    await Auth.signIn({ username: email, password });
  }

  async function ResendConfirmationCode(email) {
    await Auth.resendSignUp(email);
  }

  return (
    <>
      <div className={styles.header}>
        <p className={styles.lead}>Login to your Account</p>
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
                placeholder="Email"
                className={styles.input}
              />
              <FormikControl
                control="input"
                type="password"
                name="password"
                placeholder="Password"
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
                  LOGIN
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
