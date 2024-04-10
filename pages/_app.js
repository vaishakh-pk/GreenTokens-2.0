import "@/styles/globals.css";

//INTERNAL IMPORT
import { NavBar,Footer ,AboutUs} from "@/Components";
import {CrowdFundingProvider} from '../Context/CrowdFunding'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter(); // Initialize the useRouter hook

  // Check if the current page is the news page
  const isNewsPage = router.pathname === "/news"; // Assuming the route for the news page is "/news"
  const isEventssPage = router.pathname === "/events";
  return(
    <>
    <CrowdFundingProvider>
    {!isNewsPage &&!isEventssPage && <NavBar />}
    <Component {...pageProps} />
    {!isNewsPage && !isEventssPage && <AboutUs/>}
    <Footer/>
    </CrowdFundingProvider>
    </>
  );
}
