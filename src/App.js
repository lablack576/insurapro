import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { reveal } from "./utils/Animation.js";

function App() {
    reveal();
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={<PrivateRoute Component={Home} />}
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
