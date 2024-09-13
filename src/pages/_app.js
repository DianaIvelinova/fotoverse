import '@fotoverse/styles/globals.css'
import Header from '@fotoverse/components/Header'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideHeaderRoutes = ['/', '/signUp'];  
  
  return (
    <>
      {!hideHeaderRoutes.includes(router.pathname) && <Header />}
      <Component {...pageProps} />
    </>
  )
}
