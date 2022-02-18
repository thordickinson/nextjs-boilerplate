import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/global.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//https://html.dynamiclayers.net/dl/truno/about.html
//https://html.dynamiclayers.net/dl/truno/img/hero-moc-4.png
//http://phantom-themes.com/modern/Source/admin1/?storefront=envato-elements


import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
Amplify.configure({
  ...config,
  ssr: true
})

// Create a client
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
        <ToastContainer/>
        <Component {...pageProps} />
    </QueryClientProvider>
  )
}
