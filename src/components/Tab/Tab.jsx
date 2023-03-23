import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Tab = ({ name, content }) => {
    const { user } = useRecoilValue(auth);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsActive((current) => !current);
    };

    return (
        <div className="main_tab divider">
            <div className="left divider">
                <Sidebar />
            </div>
            <div className="right divider">
                <div className="tab">
                    <p>{name}</p>
                    <div className="profil">
                        <span onClick={handleClick}>{user}</span>
                        <MdOutlineKeyboardArrowDown onClick={handleClick} />
                    </div>
                    <ul
                        style={{
                            display: isActive ? "flex" : "",
                            color: isActive ? "none" : "",
                        }}
                        className="list"
                    >
                        <li
                            onClick={() => {
                                navigate("/settings");
                            }}
                        >
                            Settings
                        </li>
                        <li>Log out</li>
                    </ul>
                </div>
                <div className="content">{content}</div>
            </div>
        </div>
    );
};

export default Tab;
