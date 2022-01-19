import { ComponentPropsWithRef } from "react";
import Head from 'next/head'
import styles from './styles.module.scss'
import HeaderComponent from "../../common/header/header";
import FooterComponent from "../../common/footer/footer";

export default function DefaultLayout({ children }: ComponentPropsWithRef<any>) {
  return <div className={styles.container}>
    <Head>
      <title>My Awesome App</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css"/>
    </Head>

    <HeaderComponent
      links={[
        { url: '/blog', label: 'Blog' },
        { url: '/about-us', label: 'About Us' },
        { url: '/pricing', label: 'Pricing' },
        { url: '/showcase', label: 'Showcase' },
        { url: '/contact-us', label: 'Contact' }
      ]}></HeaderComponent>



    <main className={styles.main}>
      {children}
    </main>
    <FooterComponent></FooterComponent>
  </div>

}
