import { useState } from "react";
import "./Login.css";
import { ReactComponent as Logo } from "../../assets/svg/insurance.svg";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
    };

    return (
        <div className="login divider">
            <div className="left divider">
                <Logo className="logo" fill="white" stroke="white" />
            </div>
            <div className="right divider">
                <h1 className="reveal reveal12">Hello Again !</h1>
                <p className="reveal reveal12 desc">
                    Welcome to <span>InsuraPro,</span> a tool that helps
                    insurance companies organize their work.
                </p>

                <form className="reveal reveal08" onSubmit={handleSubmit}>
                    <Input
                        name="username"
                        placeholder="Username"
                        type="text"
                        Icon={AiOutlineUser}
                        value={username}
                        onChange={setUsername}
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        Icon={AiOutlineLock}
                        value={password}
                        onChange={setPassword}
                    />
                    <div className="input_links">
                        <p>
                            Not a member ?{" "}
                            <span
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Join us
                            </span>
                        </p>
                    </div>
                    <Button text="Login" type="submit" />
                </form>
                <p className="footer">
                    To reset your password, please contact us at
                    <span> contact.geniuswave@gmail.com</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
