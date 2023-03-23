import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";
import "./Users.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const UsersContent = () => {
    const { type } = useRecoilValue(auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("admin");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        console.log(userType);
    };
    return type === "admin" ? (
        <div className="UsersContent">
            <div className="card">
                <h3>Users Details</h3>
            </div>
            <div className="card">
                <h3>Add new user</h3>
                <form onSubmit={handleSubmit}>
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
                    <ul className="user_type">
                        <li
                            onClick={() => {
                                setUserType("admin");
                            }}
                            style={{
                                backgroundColor:
                                    userType === "admin" && "#399a5d",
                                color: userType === "admin" && "white",
                            }}
                        >
                            Admin
                        </li>
                        <li
                            onClick={() => {
                                setUserType("saisie");
                            }}
                            style={{
                                backgroundColor:
                                    userType === "saisie" && "#399a5d",
                                color: userType === "saisie" && "white",
                            }}
                        >
                            Agent de saisie
                        </li>
                        <li
                            onClick={() => {
                                setUserType("comptable");
                            }}
                            style={{
                                backgroundColor:
                                    userType === "comptable" && "#399a5d",
                                color: userType === "comptable" && "white",
                            }}
                        >
                            Comptable
                        </li>
                        <li
                            onClick={() => {
                                setUserType("expert");
                            }}
                            style={{
                                backgroundColor:
                                    userType === "expert" && "#399a5d",
                                color: userType === "expert" && "white",
                            }}
                        >
                            Expert
                        </li>
                    </ul>
                    <Button text="Add" type="submit" />
                </form>
            </div>
        </div>
    ) : (
        <h2>Désolé, vous n'êtes pas autorisé à accéder à cette page.</h2>
    );
};

export default UsersContent;
