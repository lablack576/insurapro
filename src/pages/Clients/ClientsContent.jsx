import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import "./Clients.css";
import { db } from "../../atoms/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";
import ClipLoader from "react-spinners/ClipLoader";
import AddClients from "./AddClients";

const ClientsContent = () => {
    const [search, setSearch] = useState();
    const [clients, setClients] = useState();
    const [companyUID, setCompanyUID] = useState();
    const [add, setAdd] = useState(true);

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
        getClientsByCompanyId(
            querySnapshot.docs[0]._document.data.value.mapValue.fields.uid
                .stringValue
        );
    };

    const getClientsByCompanyId = async (id) => {
        const q = query(
            collection(db, "clients"),
            where("company_uid", "==", id)
        );
        const querySnapshot = await getDocs(q);
        setClients(querySnapshot.docs);
    };

    if (!clients) {
        getCompanyInfoById();
    }

    return add ? (
        clients ? (
            <div className="ClientsContent">
                <div className="header">
                    <Input
                        name="search"
                        placeholder="Search for clients by first name & last name"
                        Icon={FiSearch}
                        value={search}
                        type="text"
                        onChange={setSearch}
                    />
                    <Button
                        text="Add"
                        type="button"
                        onClick={() => {
                            setAdd(false);
                        }}
                    />

                    <div className="table">
                        <ul className="main">
                            <li>First name</li>
                            <li>Last name</li>
                            <li>Phone number</li>
                            <li>Biens</li>
                            <li>Accidents</li>
                        </ul>
                        {clients.map((item, idx) => {
                            let first_name =
                                item._document.data.value.mapValue.fields.first_name.stringValue.toLowerCase();
                            let last_name =
                                item._document.data.value.mapValue.fields.last_name.stringValue.toLowerCase();

                            if (!search) {
                                return (
                                    <ul key={idx}>
                                        <li>
                                            {
                                                item._document.data.value
                                                    .mapValue.fields.first_name
                                                    .stringValue
                                            }
                                        </li>
                                        <li>
                                            {
                                                item._document.data.value
                                                    .mapValue.fields.last_name
                                                    .stringValue
                                            }
                                        </li>
                                        <li>
                                            {
                                                item._document.data.value
                                                    .mapValue.fields.phone
                                                    .stringValue
                                            }
                                        </li>

                                        <li>
                                            {Object.keys(
                                                item._document.data.value
                                                    .mapValue.fields.assets
                                                    .arrayValue
                                            ).length
                                                ? item._document.data.value
                                                      .mapValue.fields.assets
                                                      .arrayValue.values.length
                                                : "0"}
                                        </li>
                                        <li>
                                            {Object.keys(
                                                item._document.data.value
                                                    .mapValue.fields.accidents
                                                    .arrayValue
                                            ).length
                                                ? item._document.data.value
                                                      .mapValue.fields.accidents
                                                      .arrayValue.values.length
                                                : "0"}
                                        </li>
                                    </ul>
                                );
                            } else if (
                                search.toLowerCase() == first_name ||
                                search.toLowerCase() == last_name
                            ) {
                                return (
                                    <ul key={idx}>
                                        <li>
                                            {
                                                item._document.data.value
                                                    .mapValue.fields.first_name
                                                    .stringValue
                                            }
                                        </li>
                                        <li>
                                            {
                                                item._document.data.value
                                                    .mapValue.fields.last_name
                                                    .stringValue
                                            }
                                        </li>
                                        <li>
                                            {
                                                item._document.data.value
                                                    .mapValue.fields.phone
                                                    .stringValue
                                            }
                                        </li>

                                        <li>
                                            {Object.keys(
                                                item._document.data.value
                                                    .mapValue.fields.assets
                                                    .arrayValue
                                            ).length
                                                ? item._document.data.value
                                                      .mapValue.fields.assets
                                                      .arrayValue.values.length
                                                : "0"}
                                        </li>
                                        <li>
                                            {Object.keys(
                                                item._document.data.value
                                                    .mapValue.fields.accidents
                                                    .arrayValue
                                            ).length
                                                ? item._document.data.value
                                                      .mapValue.fields.accidents
                                                      .arrayValue.values.length
                                                : "0"}
                                        </li>
                                    </ul>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        ) : (
            <div className="snipper">
                <ClipLoader size={64} color="#42a867" loading={true} />
            </div>
        )
    ) : (
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
                        text="Return"
                        type="button"
                        onClick={() => {
                            setAdd(true);
                            getCompanyInfoById();
                        }}
                    />
                </div>
            </div>
            <AddClients companyUID={companyUID} />
        </>
    );
};

export default ClientsContent;
