import DashboardTitle from '../../../components/dashboard/title'
import DashboardLayout from '../../../components/layouts/dashboard-layout'
import styles from './styles.module.scss'
import React, { useState, useEffect } from 'react'
import DashboardCard from '../../../components/dashboard/card'
import { getUser } from '../../../utils/auth'
import DashboardCardHeader from '../../../components/dashboard/card-header'
import DashboardCardHeaderButton from '../../../components/dashboard/card-header-button'
import { Auth } from "aws-amplify";

export default function UserProfile() {

    const [user, setUser] = useState(null);
    const [currentName, setCurrentName] = useState(undefined);
    const [currentLastName, setCurrentLastName] = useState(undefined);
    const [currentBirthdate, setCurrentBirthdate] = useState(undefined);
    const [currentPhone, setCurrentPhone] = useState(undefined);

    
    useEffect(() => {
        (async () => {
            const u = await getUser()
            setUser(u)
            getUserInfo();
        })()
    }, [])



    function SetCurrentUser(username, lastname, birthdate, phone) {
        setCurrentName(username);
        setCurrentLastName(lastname);
        setCurrentBirthdate(birthdate);
        setCurrentPhone(phone);
    }


    async function getUserInfo() {
        const user = await Auth.currentAuthenticatedUser();
        const thisUser = user.attributes;
        SetCurrentUser(thisUser.given_name, thisUser.family_name, thisUser.birthdate, thisUser.phone_number);
        //console.log('attributes:', user.attributes);
    }

    async function updateUser() {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user ,{
          'family_name':"Ramos",
          'given_name' : "Oscar",
          'birthdate': "18/08/1986",
          'phone_number': "+573173811011"
        });
    }

    return (
        <DashboardLayout>
            <DashboardTitle title={user?.username} breadcrumb={["", "Profile"]} iconic="fa fa-home" link="/"></DashboardTitle>
            <div style={{'display':'flex'}}>
                <DashboardCard>
                    <DashboardCardHeader title="Current Name">
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                    </DashboardCardHeader>
                    <div>{currentName}</div>
                </DashboardCard>

                <DashboardCard>
                    <DashboardCardHeader title="Current Lastname">
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                    </DashboardCardHeader>
                    <div>{currentLastName}</div>
                </DashboardCard>

                <DashboardCard>
                    <DashboardCardHeader title="Birthdate">
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                    </DashboardCardHeader>
                    <div>{currentBirthdate}</div>
                </DashboardCard>
                <DashboardCard>
                    <DashboardCardHeader title="Phone Number">
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                    </DashboardCardHeader>
                    <div>{currentPhone}</div>
                </DashboardCard>
            </div>

        </DashboardLayout >
    )
}