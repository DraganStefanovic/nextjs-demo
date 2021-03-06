import '../styles/globals.css';
import { Provider } from 'react-redux';
import {store} from '../store/index';
import Head   from 'next/head';
import Script from 'next/script'


export default function Document({ Component, pageProps }) {
  return (
            <Provider store={store}>
              <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                
              
              </Head>
              <Script async id="TweenMax.min" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.3/TweenMax.min.js"></Script>
              <Script async id="MorphSVGPlugin.min" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin.min.js"></Script> 
              <Script async id="Bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous"></Script>
                            

              <Component {...pageProps} />
            </Provider>
          )
}

