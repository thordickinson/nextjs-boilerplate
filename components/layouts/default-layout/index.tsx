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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </Head>
    <HeaderComponent links={[{ url: '/blog', label: 'Blog' }, { url: '/about-us', label: 'About Us' }, { url: '/test', label: 'Hola mundo' }]}></HeaderComponent>
    <main className={styles.main}>
      {children}
    </main>
    <FooterComponent></FooterComponent>
  </div>

}
