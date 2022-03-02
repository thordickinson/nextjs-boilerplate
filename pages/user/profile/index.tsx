import DashboardTitle from '../../../components/dashboard/title'
import DashboardLayout from '../../../components/layouts/dashboard-layout'
import styles from './styles.module.scss'
import React, { useState, useEffect } from 'react'
import DashboardCard from '../../../components/dashboard/card'
import { getUser } from '../../../utils/auth'
import DashboardCardHeader from '../../../components/dashboard/card-header'
import DashboardCardHeaderButton from '../../../components/dashboard/card-header-button'
import { Auth } from "aws-amplify";
import { Formik, Form } from "formik";
import FormikControl from "../../../components/formik-control/FormikControl";
import { toast } from "react-toastify";
import { Button } from "antd";
import * as Yup from "yup";

export default function UserProfile() {

    const [user, setUser] = useState(null);

    const [currentName, setCurrentName] = useState(undefined);
    const [currentLastName, setCurrentLastName] = useState(undefined);
    const [currentBirthdate, setCurrentBirthdate] = useState(undefined);
    const [currentPhone, setCurrentPhone] = useState(undefined);

    const [updateField, setUpdateField] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const u = await getUser()
            setUser(u)
            getUserInfo();
        })()
    }, [updateField])


    //test
    function SetCurrentUser(username, lastname, birthdate, phone) {
        setCurrentName(username);
        setCurrentLastName(lastname);
        setCurrentBirthdate(birthdate);
        setCurrentPhone(phone);
    }

    //test
    async function getUserInfo() {
        const user = await Auth.currentAuthenticatedUser();
        const thisUser = user.attributes;
        SetCurrentUser(thisUser.given_name, thisUser.family_name, thisUser.birthdate, thisUser.phone_number);
        //console.log('attributes:', user.attributes);
    }

    async function updateUser(name, lastname, birthdate, phone) {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user ,{
          'family_name': lastname,
          'given_name' : name,
          'birthdate': birthdate,
          'phone_number': phone
        });
    }


    const initialValues = {
        name: currentName,
        lastname:currentLastName,
        birthdate:currentBirthdate,
        phone:currentPhone
      };
    
    const validationSchema = Yup.object({
    name: Yup.string().required("update your name"),
    lastname: Yup.string().required("Update your Lastname"),
    birthdate: Yup.date().required("Update your Birthdate"),
    phone: Yup.string().required("Update your phone number")
    });
    
    const onSubmit = (values, { resetForm }) => {
        setLoading(true);
        updateUser(values.name, values.lastname, values.birthdate, values.phone)
        .then(() => {
        setUpdateField(false);
        toast.success("Data Updated");
        setLoading(false);
        })
        .catch((e) => {
        toast.error(`${e.code}`);
        setLoading(false);
        });
    };

    //preguntar si toda la informacion va en una sola tarjeta, 
    //o para cada campo usar una tarjeta aparte

    //preguntar por el objeto como ponerlo en una constante

    //como usar el effect para cuando cambien el nombre, apellido o alguno de los campos



    return (
        <DashboardLayout>
            <DashboardTitle title={user?.username} breadcrumb={["", "Profile"]} iconic="fa fa-home" link="/"></DashboardTitle>
            <div style={{'display':'flex'}}>
                <DashboardCard>
                    <DashboardCardHeader title="Current Info Profile">
                        {!updateField?<DashboardCardHeaderButton iconClass="fa fa-wrench" onClick={() => setUpdateField(true)}/>:null}
                        {updateField?<DashboardCardHeaderButton iconClass="fa fa-id-card" onClick={() => setUpdateField(false)}/>:null}
                    </DashboardCardHeader>
                    <div className={styles.cardContainer}>
                    {!updateField?<div className={styles.cardInfo}>
                        <div className={styles.row}>
                            <h4>Name</h4>
                            <div>{currentName}</div>
                        </div>
                        <div className={styles.row}>
                            <h4>Lastname</h4>
                            <div>{currentLastName}</div>
                        </div>
                        <div className={styles.row}>
                            <h4>Birthdate</h4>
                            <div>{currentBirthdate}</div>
                        </div>
                        <div className={styles.row}>
                            <h4>Phone Number</h4>
                            <div>{currentPhone}</div>
                        </div>
                        </div>:null}
                        <div className={styles.form}>
                        {updateField? <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                            {(formik) => {
                                return (
                                <Form className={styles.containerItems}>
                                    <FormikControl
                                    control="input"
                                    label="Name"
                                    type="name"
                                    name="name"
                                    placeholder={currentName}
                                    />
                                
                                    <FormikControl
                                    control="input"
                                    label="Lastname"
                                    type="lastname"
                                    name="lastname"
                                    placeholder={currentLastName}
                                    />

                                    <FormikControl
                                    control="input"
                                    label="Birthdate"
                                    type="date"
                                    name="birthdate"
                                    placeholder={currentBirthdate}
                                    />

                                    <FormikControl
                                    control="input"
                                    label="Phone"
                                    type="phone"
                                    name="phone"
                                    placeholder={currentPhone}
                                    />

                                    <div className={styles.buttonContainer}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={!formik.isValid}
                                        size="large"
                                        loading={loading}
                                    >
                                        Send
                                    </Button>
                                    {!formik.isValid ? (
                                        <span className={styles.note}>COMPLETE THE FIELDS</span>
                                    ) : null}
                                    </div>
                                </Form>
                                );
                            }}
                            </Formik>:null}
                        </div>
                    </div>
                </DashboardCard>

                <DashboardCard>
                    <DashboardCardHeader title="Hello">
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("OK")}/>
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("OK")}/>
                    </DashboardCardHeader>
                </DashboardCard>
            </div>

        </DashboardLayout >
    )
}