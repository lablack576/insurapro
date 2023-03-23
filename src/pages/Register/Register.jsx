import "./Register.css";
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {
    AiOutlineUser,
    AiOutlineLock,
    AiOutlineBank,
    AiOutlineRollback,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { reveal } from "../../utils/Animation.js";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        reveal();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        console.log(company);
    };

    return (
        <div className="register divider">
            <p
                className="back"
                onClick={() => {
                    navigate("/login");
                }}
            >
                <span>Back</span>
                <AiOutlineRollback />
            </p>
            <div className="left divider">
                <h2 className="logo">InsuraPro</h2>
            </div>
            <div className="right divider">
                <h1 className="reveal reveal12">Join Us !</h1>
                <p className="desc reveal reveal12">
                    Create an account for your insurance company and manage it
                    remotely using our software InsuraPro.
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
                        name="company"
                        placeholder="Company ID"
                        type="text"
                        Icon={AiOutlineBank}
                        value={company}
                        onChange={setCompany}
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        Icon={AiOutlineLock}
                        value={password}
                        onChange={setPassword}
                    />
                    <Button text="Register" type="submit" />
                </form>
                <p className="footer">
                    Contact us at
                    <span> contact.geniuswave@gmail.com</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
