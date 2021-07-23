import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/global.scss'

//https://html.dynamiclayers.net/dl/truno/about.html
//https://html.dynamiclayers.net/dl/truno/img/hero-moc-4.png
//http://phantom-themes.com/modern/Source/admin1/?storefront=envato-elements

// Create a client
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  )
}
