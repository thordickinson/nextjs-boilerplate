import { ComponentPropsWithRef } from "react";
import Head from 'next/head'
import styles from './default-layout.module.scss'
import HeaderComponent from "../common/header/header";

export default function DefaultLayout({ children }: ComponentPropsWithRef<any>) {
    return <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeaderComponent links={[{ url: '/test', label: 'Hola mundo' }, { url: '/test', label: 'Hola mundo' }, { url: '/test', label: 'Hola mundo' }]}></HeaderComponent>
        <main className={styles.main}>
            {children}
        </main>
        <footer>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel" className="logo" />
            </a>
        </footer>
    </div>

}
