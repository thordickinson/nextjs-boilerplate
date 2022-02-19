import DashboardLayout from "../../../../components/layouts/dashboard-layout";
import DashboardTitle from "../../../../components/dashboard/title";
import { toast } from 'react-toastify';
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik-control/FormikControl";
import * as Yup from "yup";
import { Auth } from 'aws-amplify';
import styles from './styles.module.scss';

export default function ChangePassword() {

    const initialValues ={
        oldPassword: '',
        newPassword:'',
        passwordConfirmation:''
    }

    const validationSchema = Yup.object({
        oldPassword: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.'),
        newPassword: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.'),
        passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("newPassword")], 'Passwords are not the same!')
        .required('Password confirmation is required!')
    });

    const onSubmit = (values, {resetForm}) => {
        
        ChangePassword(values.oldPassword, values.newPassword)
        .then(()=>{
            resetForm();
        }).catch((e)=>{
            console.log('error signing up: ', e);
        });
    }

    async function ChangePassword(oldPassword, newPassword) {
        
        Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, oldPassword, newPassword);
        })
        .then(data => toast.success('Congrats' + data))
        .catch(err => toast.error('Important: ' + err));
    }

    return <>
  <DashboardLayout>
            <DashboardTitle title="Change Password" breadcrumb={["", "Change Password"]} iconic="fa fa-home" link="/"></DashboardTitle>
            
            <div className={styles.header}>
                <p className={styles.lead}>Update Your Password</p>
            </div>
            <Formik
                initialValues={initialValues}   
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik =>{
                        return <Form className={styles.containerItems}>
                            <FormikControl
                                control ='input'
                                type='password'
                                name='oldPassword'
                                placeholder='Old Password'
                                className={styles.input}
                            />
                            <FormikControl
                                control ='input'
                                type='password'
                                name='newPassword'
                                placeholder='New Password'
                                className={styles.input}
                            />
                            <FormikControl
                                control ='input'
                                type='password'
                                name='passwordConfirmation'
                                placeholder='Password Confirmation'
                                className={styles.input}
                            />
                            
                        <div className={styles.buttonForm}>
                            <button type="submit" disabled={!formik.isValid}>UPDATE PASSWORD</button>
                        </div>
                    </Form>
                    
                    }
                }
            </Formik>
    </DashboardLayout>
  
  </>
}
