import Card from "./componemt/card";
import Footer from "./componemt/Footer";
import Navbar from "./componemt/Navbar";
import MovieSearch from "./componemt/Search";
import { Route,Routes } from "react-router-dom";
import ContactSection from "./componemt/Contcat";
function App() {
  return (
   <>
   <Navbar />
<Routes>
<Route path="/" element={<Card/>} />
<Route path="/search" element={<MovieSearch/>} />
<Route path="/Contact" element={<ContactSection/>} />

</Routes>
<Footer />
   </>
  );
}

export default App;
