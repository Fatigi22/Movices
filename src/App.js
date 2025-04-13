import Card from "./componemt/card";
import Footer from "./componemt/Footer";
import Navbar from "./componemt/Navbar";
import MovieSearch from "./componemt/Search";
import { Route,Routes } from "react-router-dom";
import ContactSection from "./componemt/Contcat";
import FilmDetail from "./componemt/VIdoe";
function App() {
  return (
   <>
   <Navbar />
<Routes>
<Route path="/" element={<Card/>} />
<Route path="/search" element={<MovieSearch/>} />
<Route path="/Contact" element={<ContactSection/>} />
<Route path="/film/:id" element={<FilmDetail />} />

</Routes>
<Footer />
   </>
  );
}

export default App;
