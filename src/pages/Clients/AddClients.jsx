import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { uid } from "uid";
import { AiOutlinePhone, AiOutlineCalendar } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../atoms/firebase";
import { format } from "date-fns";

const AddClients = (companyUID) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [birth, setBirth] = useState();
    const [phone, setPhone] = useState();

    const user = useRecoilValue(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const now = new Date();
        const firestoreTimestamp = now.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
            timeZone: "Europe/London", // set your desired timezone here
        });
        let data = {
            uid: uid(16),
            user_uid: user.uid,
            phone: phone,
            last_name: lastName,
            first_name: firstName,
            inscription_date: firestoreTimestamp,
            birth_date: birth,
            company_uid: companyUID.companyUID,
            assets: [],
            accidents: [],
        };

        await setDoc(doc(db, "clients", data.uid), data).then(() => {
            setFirstName("");
            setLastName("");
            setBirth("");
            setPhone("");
        });
    };

    return (
        <div className="AddClients">
            <form onSubmit={handleSubmit}>
                <Input
                    pattern="[+]{1}[1-9]{1,3}[0-9]{9}"
                    name="phone"
                    placeholder="+33 123 456 789"
                    type="tel"
                    Icon={AiOutlinePhone}
                    value={phone}
                    onChange={setPhone}
                />
                <Input
                    name="firstName"
                    placeholder="First name"
                    type="text"
                    Icon={IoPersonOutline}
                    value={firstName}
                    onChange={setFirstName}
                />
                <Input
                    name="lastName"
                    placeholder="Last name"
                    type="text"
                    Icon={IoPersonOutline}
                    value={lastName}
                    onChange={setLastName}
                />
                <Input
                    name="birthDate"
                    placeholder="Birth day"
                    type="date"
                    Icon={AiOutlineCalendar}
                    value={birth}
                    onChange={setBirth}
                />
                <Button text="Add" type="submit" />
            </form>
        </div>
    );
};

export default AddClients;
