import styles from "./styles.module.scss"
import DefaultLayout from "../../components/layouts/default-layout"
import { Formik, Form, Field, ErrorMessage } from "formik"
import React, { useState } from "react"
import { Divider } from "antd"


export default function Contact_Us() {
    const [formSend, setFormSend] = useState(false)


    const titleContact = "Get in touch with us & send us message today!";

    const descriptionContact = "Saasbiz is a different kind of architecture practice." +
        "Founded by LoganCee in 1991, we’re an employee-owned firm pursuing a" +
        "democratic design process that values everyone’s input.";

    const addressContact = "198 West 21th Street, Suite 721 " +
        "New York, NY 10010";

    const contact = [{
        email: "Email: Dynamiclayers.Net",
        phone: "Phone: +88 (0) 101 0000 000",
        fax: "Fax: +88 (0) 202 0000 001"
    }];

    return (
        <DefaultLayout>
            <div className={styles.contact_section}>
                <div className={styles.map_background}></div>
                <div className={styles.container}>
                    <div className={styles.contact_wrap}>
                        <div className={styles.itemA}>
                            <h2>{titleContact}</h2>
                            <p>
                                {descriptionContact}
                            </p>
                            <div className={styles.address}>
                                <h3>
                                    {addressContact}
                                </h3>
                            </div>
                            <div className={styles.phones}>
                                <h4>
                                    {contact.map((c, i) =>
                                        <ul>
                                            <li>{`${c.email}`}</li>
                                            <li>{`${c.phone}`}</li>
                                            <li>{`${c.fax}`}</li>
                                        </ul>
                                    )}
                                </h4>
                            </div>
                        </div>
                        <div className={styles.itemB}>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    message: ''
                                }}
                                validate={(values) => {
                                    let errores: any = {};
                                    //validacion nombre
                                    if (!values.name) {
                                        errores.name = "Ingresa un nombre";
                                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                                        errores.name = "El nombre solo puede contener letras y espacios";
                                    }

                                    //validacion mail
                                    if (!values.email) {
                                        errores.email = "Ingresa un correo electronico";
                                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                                        errores.email = "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo";
                                    }

                                    if (!values.message) {
                                        errores.message = "El mensaje no puede estar vacio";
                                    }

                                    return errores;
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    resetForm();
                                    console.log("formulario enviado");
                                    setFormSend(true);
                                    setTimeout(() => setFormSend(false), 5000);
                                }}
                            >
                                {({ errors }) => (
                                    <Form className={styles.containerItems}>
                                        <div className={styles.inputCont}>
                                            <label htmlFor="name">Name</label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder=" Name"
                                                className={styles.input}
                                            />
                                            {!errors.name ? <span className={styles.noError}>Put your name Here</span> : <span className={styles.error}>{errors.name}</span>}

                                        </div>
                                        <div className={styles.inputCont}>
                                            <label htmlFor="email">E-mail</label>
                                            <Field
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder=" email@email.com"
                                                className={styles.input}
                                            />
                                            {!errors.email ? <span className={styles.noError}>Put your E-mail Here</span> : <span className={styles.error}>{errors.email}</span>}
                                        </div>
                                        <div className={styles.inputMessageCont}>
                                            <label htmlFor="message">Message</label>
                                            <Field
                                                type="text"
                                                id="message"
                                                name="message"
                                                as="textarea"
                                                placeholder=" message..."
                                                className={styles.inputMessage}
                                            />
                                            {!errors.message ? <span className={styles.noError}>Your Message</span> : <span className={styles.error}>{errors.message}</span>}
                                        </div>
                                        <div className={styles.buttonForm}>
                                            <button type="submit">Send Message</button>
                                            {formSend ? <p className={styles.exito}>Formulario enviado con exito!</p> : <p>  </p>}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

/*

 <div className={styles.contact_section}>
                <div className={styles.map_background}></div>
                <div className={styles.container}>
                    <div className={styles.contact_wrap}>
                        <div className={styles.itemA}>
                            <h2>{titleContact}</h2>
                            <p>
                                {descriptionContact}
                            </p>
                            <div className={styles.address}>
                                <h3>
                                    {addressContact}
                                </h3>
                            </div>
                            <div className={styles.phones}>
                                <h4>
                                    {contact.map((c, i) =>
                                        <ul>
                                            <li>{`${c.email}`}</li>
                                            <li>{`${c.phone}`}</li>
                                            <li>{`${c.fax}`}</li>
                                        </ul>
                                    )}
                                </h4>
                            </div>
                        </div>
                        <div className={styles.itemB}>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    message: ''
                                }}
                                validate={(values) => {
                                    let errores: any = {};
                                    //validacion nombre
                                    if (!values.name) {
                                        errores.name = "Ingresa un nombre";
                                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                                        errores.name = "El nombre solo puede contener letras y espacios";
                                    }

                                    //validacion mail
                                    if (!values.email) {
                                        errores.email = "Ingresa un correo electronico";
                                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                                        errores.email = "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo";
                                    }

                                    if (!values.message) {
                                        errores.message = "El mensaje no puede estar vacio";
                                    }

                                    return errores;
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    resetForm();
                                    console.log("formulario enviado");
                                    setFormSend(true);
                                    setTimeout(() => setFormSend(false), 5000);
                                }}
                            >
                                {({ errors }) => (
                                    <Form className={styles.containerItems}>
                                        <div className={styles.inputNameCont}>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="your name"
                                                className={styles.inputName}
                                            />
                                            <ErrorMessage name="name" component={() => (
                                                <div className={styles.error}>{errors.name}</div>
                                            )} />
                                        </div>
                                        <div className={styles.inputEmailCont}>
                                            <Field
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder="correo@correo.com"
                                                className={styles.inputEmail}
                                            />
                                            <ErrorMessage name="email" component={() => (
                                                <div className={styles.error}>{errors.email}</div>
                                            )} />
                                        </div>
                                        <div className={styles.inputMessageCont}>
                                            <Field
                                                type="text"
                                                id="message"
                                                name="message"
                                                as="textarea"
                                                placeholder="message..."
                                                className={styles.inputMessage}
                                            />
                                            <ErrorMessage name="message" component={() => (
                                                <div className={styles.error}>{errors.message}</div>
                                            )} />
                                        </div>
                                        <div className={styles.buttonForm}>
                                            <button type="submit">Send Message</button>
                                            {formSend && <p className={styles.exito}>Formulario enviado con exito!</p>}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>


*/