import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, SignUp } from "../pages";
import { Loader, Navbar } from "./";

const Page404 = () => {
  return <h1>Page not found</h1>;
};
// const Login = () => {
//   return <h1>Login</h1>;
// };
function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* here routes is same as switch of react router v5 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
