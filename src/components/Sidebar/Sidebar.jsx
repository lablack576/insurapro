import { SideBarItems } from "../../utils/SideBarItems";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";

const Sidebar = () => {
    const navigate = useNavigate();
    const { type } = useRecoilValue(auth);

    return (
        <div className="sidebar">
            <h1 className="logo">InsuraPro</h1>
            <ul>
                {SideBarItems.map((item, index) => {
                    return type === "admin" ? (
                        <li
                            key={index}
                            onClick={() => {
                                navigate(item.target);
                            }}
                        >
                            <span>{item.text}</span>
                        </li>
                    ) : (
                        item.text !== "Users" && (
                            <li
                                key={index}
                                onClick={() => {
                                    navigate(item.target);
                                }}
                            >
                                <span>{item.text}</span>
                            </li>
                        )
                    );
                })}
            </ul>
            <p className="footer">Version 1.0</p>
        </div>
    );
};

export default Sidebar;
