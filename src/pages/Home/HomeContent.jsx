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
import { collection, query, where, getDocs } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";

const HomeContent = () => {
    const user = useRecoilValue(auth);
    const [company, setCompany] = useState();
    const [clients, setClients] = useState();
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
                                <h3>Biens assurés</h3>
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
