import { ComponentPropsWithRef } from "react";
import Head from 'next/head'
import styles from './default-layout.module.scss'
import HeaderComponent from "../common/header/header";
import FooterComponent from "../common/footer/footer";

export default function DefaultLayout({ children }: ComponentPropsWithRef<any>) {
  return <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/brands.min.css"
        integrity="sha512-apX8rFN/KxJW8rniQbkvzrshQ3KvyEH+4szT3Sno5svdr6E/CP0QE862yEeLBMUnCqLko8QaugGkzvWS7uNfFQ=="
        crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css"
        integrity="sha512-OdEXQYCOldjqUEsuMKsZRj93Ht23QRlhIb8E/X0sbwZhme8eUw6g8q7AdxGJKakcBbv7+/PX0Gc2btf7Ru8cZA=="
        crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </Head>
    <HeaderComponent links={[{ url: '/blog', label: 'Blog' }, { url: '/test', label: 'Hola mundo' }, { url: '/test', label: 'Hola mundo' }]}></HeaderComponent>
    <main className={styles.main}>
      {children}
    </main>
    <FooterComponent></FooterComponent>
  </div>

}
