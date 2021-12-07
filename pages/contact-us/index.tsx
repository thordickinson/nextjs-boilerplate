import styles from "./styles.module.scss"
import DefaultLayout from "../../components/layouts/default-layout"
import { Formik } from "formik"

export default function Contact_Us() {
    return (
        <DefaultLayout>
            <div className={styles.contact_section}>
                <div className={styles.map_background}></div>

                <div className={styles.container}>
                    <div className={styles.contact_wrap}>
                        <div className={styles.itemA}>
                            <h2>Get in touch with us & send us message today!</h2>
                            <p>
                                Saasbiz is a different kind of architecture practice. 
                                Founded by LoganCee in 1991, we’re an employee-owned firm pursuing a 
                                democratic design process that values everyone’s input.
                            </p>
                            <div className={styles.address}>
                                <h3>
                                    198 West 21th Street, Suite 721 
                                    New York, NY 10010
                                </h3>
                            </div>
                            <div className={styles.phones}>
                                <h4>
                                    Email: Dynamiclayers.Net 
                                    Phone: +88 (0) 101 0000 000
                                    Fax: +88 (0) 202 0000 001
                                </h4>
                            </div>
                        </div>
                        <div className={styles.itemB}>
                            {/*aqui poner el formulario de formik */}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
