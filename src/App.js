
import RegisterForm from "./components/auth/register";
import LoginForm from "./components/auth/login";
import Profile from "./components/profile/profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Viset from "./components/viset/Viset";
import Producted from "./components/protected_routes/producted";
import NotFound from "./components/pageNotFound/pageNotFound";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/producted" element= {<Producted/>}>
      </Route>
      <Route path="/:id" element={<Viset/>}/>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
