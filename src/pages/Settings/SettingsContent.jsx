import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { AiOutlineLock } from "react-icons/ai";
import "./Settings.css";

const SettingsContent = () => {
    const [currPassword, setCurrPassword] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currPassword);
        console.log(password);
        console.log(password2);
    };
    return (
        <div className="settings_content">
            <h2>Reset your password</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name="curr_password"
                    placeholder="Current password"
                    type="password"
                    Icon={AiOutlineLock}
                    value={currPassword}
                    onChange={setCurrPassword}
                />
                <Input
                    name="password"
                    placeholder="New password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                />
                <Input
                    name="password2"
                    placeholder="Confirm new password"
                    type="password"
                    value={password2}
                    onChange={setPassword2}
                />
                <Button text="Reset" type="submit" />
            </form>
        </div>
    );
};

export default SettingsContent;
