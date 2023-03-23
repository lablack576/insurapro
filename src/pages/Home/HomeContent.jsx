import "./Home.css";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";
import {
    BsPerson,
    BsCarFront,
    BsFillExclamationTriangleFill,
} from "react-icons/bs";

const HomeContent = () => {
    const { type } = useRecoilValue(auth);

    return (
        <div className="HomeContent">
            <h2 className="headerDesc">
                Welcome to InsuraPro for <span>CRMA</span>
            </h2>
            <p className="welcomeDesc">Dashboard Overview</p>
            {type === "admin" && (
                <div className="stats">
                    <div className="stat-card">
                        <div>
                            <h3>Clients</h3>
                            <p>
                                XXXX<span>-XX%</span>
                            </p>
                        </div>
                        <BsPerson />
                    </div>
                    <div className="stat-card">
                        <div>
                            <h3>Biens</h3>
                            <p>
                                XXXX<span>+XX%</span>
                            </p>
                        </div>
                        <BsCarFront />
                    </div>
                    <div className="stat-card">
                        <div>
                            <h3>Accidents</h3>
                            <p>
                                XXXX<span>+XX%</span>
                            </p>
                        </div>
                        <BsFillExclamationTriangleFill />
                    </div>
                    <div className="stat-chart">Clients</div>
                    <div className="stat-chart">Biens</div>
                    <div className="stat-chart">Accidents</div>
                </div>
            )}
        </div>
    );
};

export default HomeContent;
