import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Accidents from "./pages/Accidents/Accidents";
import Clients from "./pages/Clients/Clients";
import Users from "./pages/Users/Users";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={<PrivateRoute Component={Home} />}
                />

                <Route
                    path="/clients"
                    exact
                    element={<PrivateRoute Component={Clients} />}
                />
                <Route
                    path="/accidents"
                    exact
                    element={<PrivateRoute Component={Accidents} />}
                />
                <Route
                    path="/users"
                    exact
                    element={<PrivateRoute Component={Users} />}
                />

                <Route
                    path="/login"
                    exact
                    element={<PublicRoute Component={Login} />}
                />
                <Route
                    path="/register"
                    exact
                    element={<PublicRoute Component={Register} />}
                />
                <Route path="*" exact element={<p>404 - Page introuvable</p>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
