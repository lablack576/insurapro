import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Clients from "./pages/Clients/Clients";
import Users from "./pages/Users/Users";
import View from "./pages/Clients/View/View";

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
                    path="/clients/view/:clientUID"
                    exact
                    element={<PrivateRoute Component={View} />}
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
