import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Home, Login, Settings, SignUp, UserProfile } from "../pages";
import PrivateRoute from "../routes/PrivateRoute";
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
          <Route
            path="/settings"
            element={
              <PrivateRoute redirectTo="/login">
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute redirectTo="/login">
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
