import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";
import "./Users.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { db } from "../../atoms/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    arrayUnion,
    updateDoc,
} from "firebase/firestore";
import { uid } from "uid";

const UsersContent = () => {
    const user = useRecoilValue(auth);
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [userType, setUserType] = useState("admin");
    const [companyId, setCompanyID] = useState();

    const getCompanyInfoById = async () => {
        const q = query(
            collection(db, "companies"),
            where("users", "array-contains", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setCompanyID(
            querySnapshot.docs[0]._document.data.value.mapValue.fields.uid
                .stringValue
        );
    };
    if (!companyId) {
        getCompanyInfoById();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let username_uid = uid(16);

        await setDoc(doc(db, "users", username_uid), {
            uid: username_uid,
            isFounder: false,
            phone: phone,
            type: userType,
            username: username,
        })
            .then(async () => {
                const docRef = doc(db, "companies", companyId);
                await updateDoc(docRef, {
                    users: arrayUnion(username_uid),
                });
            })
            .then(() => {
                setUsername("");
                setPhone("");
                setUserType("");
            });
    };
    return user.type === "admin" ? (
        <div className="UsersContent">
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
                        pattern="[+]{1}[1-9]{1,3}[0-9]{9}"
                        name="phone"
                        placeholder="+33 123 456 789"
                        type="tel"
                        Icon={AiOutlinePhone}
                        value={phone}
                        onChange={setPhone}
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
