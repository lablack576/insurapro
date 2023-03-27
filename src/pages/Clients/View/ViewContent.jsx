import Button from "./../../../components/Button/Button";
import "./View.css";
import { db } from "../../../atoms/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { useState } from "react";
import Input from "../../../components/Input/Input";
import { uid } from "uid";
import { useRecoilValue } from "recoil";
import { auth } from "../../../atoms/auth";

const ViewContent = (cid) => {
    const [assets, setAssets] = useState();
    const [accidents, setAccidents] = useState();
    const [mat, setMat] = useState();
    const [type, setType] = useState();
    const [insuDate, setInsuDate] = useState();
    const [expDate, setExpDate] = useState();
    const [relDate, setRelDate] = useState();
    const [purchDate, setPurchDate] = useState();
    const [companyUID, setCompanyUID] = useState();

    // Accident state

    const [accidentDate, setAccidentDate] = useState();
    const [dedoValue, setDedoValue] = useState();
    const [evalState, setEvalState] = useState();
    const [payState, setPayState] = useState();

    const user = useRecoilValue(auth);

    const getCompanyInfoById = async () => {
        const q = query(
            collection(db, "companies"),
            where("users", "array-contains", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setCompanyUID(
            querySnapshot.docs[0]._document.data.value.mapValue.fields.uid
                .stringValue
        );
    };
    if (!companyUID) {
        getCompanyInfoById();
    }

    const getAssetsByClientUID = async () => {
        const q = query(
            collection(db, "assets"),
            where("client_uid", "==", cid.cid)
        );
        const querySnapshot = await getDocs(q);
        setAssets(querySnapshot.docs);
    };

    const getAccidentsByClientUID = async () => {
        const q = query(
            collection(db, "accidents"),
            where("client_uid", "==", cid.cid)
        );
        const querySnapshot = await getDocs(q);
        setAccidents(querySnapshot.docs);
    };

    if (!accidents) {
        getAccidentsByClientUID();
    }

    if (!assets) {
        getAssetsByClientUID();
    }

    const submitAccident = async (e) => {
        e.preventDefault();
    };

    const submitAsset = async (e) => {
        e.preventDefault();

        let data = {
            uid: uid(16),
            type: type,
            release_year: relDate,
            purchase_year: purchDate,
            mat: mat,
            insu_date: insuDate,
            exp_date: expDate,
            client_uid: cid.cid,
            accidents: [],
            company_uid: companyUID,
        };

        await setDoc(doc(db, "assets", data.uid), data)
            .then(async () => {
                const docRef = doc(db, "clients", cid.cid);
                await updateDoc(docRef, {
                    assets: arrayUnion(data.uid),
                });
            })
            .then(() => {
                setMat("");
                setType("");
                setInsuDate("");
                setExpDate("");
                setRelDate("");
                setPurchDate("");
                getAssetsByClientUID();
            });
    };

    return (
        <>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <div
                    style={{
                        width: "fit-content !important",
                    }}
                >
                    <Button
                        onClick={() => window.history.back()}
                        text="Return"
                        background="#ce3838"
                    />
                </div>
            </div>
            <br />
            <div className="container">
                {assets && (
                    <div className="div table">
                        <br />
                        <h3>Assets</h3>
                        <br />

                        <form onSubmit={submitAsset}>
                            <ul className="addform">
                                <li>
                                    <Input
                                        name="mat"
                                        placeholder="Number"
                                        type="text"
                                        value={mat}
                                        onChange={setMat}
                                    />
                                </li>

                                <li>
                                    <datalist id="browsers">
                                        <option value="Car" />
                                    </datalist>
                                    <Input
                                        list="browsers"
                                        name="type"
                                        placeholder="Type"
                                        type="text"
                                        value={type}
                                        onChange={setType}
                                    />
                                </li>
                                <li>
                                    <Input
                                        name="InsuDate"
                                        placeholder="InsuDate"
                                        type="date"
                                        value={insuDate}
                                        onChange={setInsuDate}
                                    />
                                </li>
                                <li>
                                    <Input
                                        name="ExpDate"
                                        placeholder="ExpDate"
                                        type="date"
                                        value={expDate}
                                        onChange={setExpDate}
                                    />
                                </li>
                                <li>
                                    <Input
                                        name="RelDate"
                                        placeholder="RelYear"
                                        type="text"
                                        value={relDate}
                                        onChange={setRelDate}
                                    />
                                </li>
                                <li>
                                    <Input
                                        name="PurchDate"
                                        placeholder="PurchYear"
                                        type="text"
                                        value={purchDate}
                                        onChange={setPurchDate}
                                    />
                                </li>

                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "fit-content !important",
                                        }}
                                    >
                                        <Button type="submit" text="Add" />
                                    </div>
                                </div>
                            </ul>
                        </form>
                        <ul className="main">
                            <li>UID</li>
                            <li>Type</li>
                            <li>Insurance date</li>
                            <li>Expiration date</li>
                            <li>Release year</li>
                            <li>Purchase year</li>
                            <li>Accidents</li>
                        </ul>

                        {assets.map((item, idx) => {
                            return (
                                <ul key={idx}>
                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.uid.stringValue
                                        }
                                    </li>

                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.type.stringValue
                                        }
                                    </li>
                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.insu_date.stringValue
                                        }
                                    </li>
                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.exp_date.stringValue
                                        }
                                    </li>
                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.release_year.stringValue
                                        }
                                    </li>
                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.purchase_year
                                                .stringValue
                                        }
                                    </li>
                                    <li>
                                        {Object.keys(
                                            item._document.data.value.mapValue
                                                .fields.accidents.arrayValue
                                        ).length
                                            ? item._document.data.value.mapValue
                                                  .fields.accidents.arrayValue
                                                  .values.length
                                            : "0"}
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                )}

                {accidents && (
                    <div className="div table">
                        <br />
                        <h3>Accidents</h3>
                        <br />
                        <br /> <br />
                        <ul className="main">
                            <li>Date</li>
                            <li>Compensation value</li>
                            <li>Evaluation state</li>
                            <li>Payment state</li>
                        </ul>
                        {accidents.map((item, idx) => {
                            return (
                                <ul key={idx}>
                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.accident_date
                                                .stringValue
                                        }
                                    </li>
                                    <li>
                                        {
                                            item._document.data.value.mapValue
                                                .fields.dedo_value.integerValue
                                        }
                                    </li>
                                    <li>
                                        {item._document.data.value.mapValue
                                            .fields.evaluation_state
                                            .booleanValue
                                            ? "Yes"
                                            : "No"}
                                    </li>
                                    <li>
                                        {item._document.data.value.mapValue
                                            .fields.payment_state.booleanValue
                                            ? "Yes"
                                            : "No"}
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewContent;
