import "./Home.css";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";
import {
    BsPerson,
    BsCarFront,
    BsFillExclamationTriangleFill,
} from "react-icons/bs";
import { useState } from "react";
import { db } from "../../atoms/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from "chart.js";

const HomeContent = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        PointElement
    );

    const user = useRecoilValue(auth);
    const [company, setCompany] = useState();
    const [clients, setClients] = useState();
    const [monthlyClients, setMonthlyClients] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [monthlyAssets, setMonthlyAssets] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [assets, setAssets] = useState();
    const [accidents, setAccidents] = useState();
    const getClientsByCompanyId = async (id) => {
        const q = query(
            collection(db, "clients"),
            where("company_uid", "==", id)
        );
        const querySnapshot = await getDocs(q);
        setClients(querySnapshot.docs);
    };
    const getAssetsByCompanyId = async (id) => {
        const q = query(
            collection(db, "assets"),
            where("company_uid", "==", id)
        );
        const querySnapshot = await getDocs(q);
        setAssets(querySnapshot.docs);
    };

    const getAccidentsByCompanyId = async (id) => {
        const q = query(
            collection(db, "accidents"),
            where("company_uid", "==", id)
        );
        const querySnapshot = await getDocs(q);
        setAccidents(querySnapshot.docs);
    };

    const getCompanyInfoById = async () => {
        const q = query(
            collection(db, "companies"),
            where("users", "array-contains", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setCompany(
            querySnapshot.docs[0]._document.data.value.mapValue.fields.company
                .stringValue
        );
        if (user.type === "admin") {
            getClientsByCompanyId(
                querySnapshot.docs[0]._document.data.value.mapValue.fields.uid
                    .stringValue
            );
            getAssetsByCompanyId(
                querySnapshot.docs[0]._document.data.value.mapValue.fields.uid
                    .stringValue
            );
            getAccidentsByCompanyId(
                querySnapshot.docs[0]._document.data.value.mapValue.fields.uid
                    .stringValue
            );
        }
    };
    if (!(clients && company && assets && accidents)) {
        getCompanyInfoById();
    }

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly new clients",
            },
        },
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly assets",
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: "Clients",
                data: monthlyClients,
                backgroundColor: "#b3dec6",
            },
        ],
    };

    const data2 = {
        labels,
        datasets: [
            {
                label: "Assets",
                data: monthlyAssets,
                borderColor: "#399a5d",
                backgroundColor: "#b3dec6",
            },
        ],
    };

    return user.type === "admin" ? (
        company && clients && assets && accidents ? (
            <>
                <h2 className="headerDesc">
                    Welcome to InsuraPro for <span>{company}</span>
                </h2>
                <p className="welcomeDesc">Dashboard Overview</p>
                <div className="HomeContent">
                    <div className="stats">
                        <div className="stat-card">
                            <div>
                                <h3>Clients</h3>
                                <p>{clients.length}</p>
                            </div>
                            <BsPerson />
                        </div>
                        <div className="stat-card">
                            <div>
                                <h3>Assets</h3>
                                <p>{assets.length}</p>
                            </div>
                            <BsCarFront />
                        </div>
                        <div className="stat-card">
                            <div>
                                <h3>Accidents</h3>
                                <p>{accidents.length}</p>
                            </div>
                            <BsFillExclamationTriangleFill />
                        </div>
                    </div>
                    <div className="charts">
                        <div>
                            <Bar options={options} data={data} />
                        </div>
                        <div>
                            <Line options={options2} data={data2} />
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <div className="snipper">
                <ClipLoader size={64} color="#42a867" loading={true} />
            </div>
        )
    ) : company ? (
        <>
            <h2 className="headerDesc">
                Welcome to InsuraPro for <span>{company}</span>
            </h2>
            <p className="welcomeDesc">Dashboard Overview</p>
        </>
    ) : (
        <div className="snipper">
            <ClipLoader size={64} color="#42a867" loading={true} />
        </div>
    );
};

export default HomeContent;
