import "../styles/globals.css";
import { PostsProvider } from "../context/PostContext"; // Ensure the correct path for the PostsContext
import { CompareProvider } from "../context/compareContext"; // Ensure the correct path for the CompareContext
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CategoryProvider } from "../context/categoryContext";

function MyApp({ Component, pageProps }) {
  return (
    <PostsProvider>
      <CompareProvider>
        <CategoryProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </CategoryProvider>
      </CompareProvider>
    </PostsProvider>
  );
}

export default MyApp;
