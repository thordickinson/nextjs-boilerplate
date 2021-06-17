import { Provider } from 'next-auth/client'
import '../styles/global.scss'

//https://html.dynamiclayers.net/dl/truno/about.html
//https://html.dynamiclayers.net/dl/truno/img/hero-moc-4.png
//http://phantom-themes.com/modern/Source/admin1/?storefront=envato-elements

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
