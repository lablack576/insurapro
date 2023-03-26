import "./Register.css";
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {
    AiOutlineUser,
    AiOutlinePhone,
    AiOutlineBlock,
    AiOutlineBank,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { reveal } from "../../utils/Animation.js";
import { authentication, db } from "../../atoms/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
} from "firebase/firestore";
import { uid } from "uid";

const Register = () => {
    useEffect(() => {
        reveal();
    }, []);

    const [company, setCompany] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [optclicked, setOptclicked] = useState(false);
    const [exist, setExist] = useState(false);
    const [opt, setOpt] = useState("");
    const setAuth = useSetRecoilState(auth);

    const navigate = useNavigate();

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "sign-in-button",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                },
                authentication
            );
        }
    };

    const onSignup = async () => {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        await signInWithPhoneNumber(authentication, phone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setOptclicked(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onOTPVerify = async () => {
        let company_uid = uid(16);
        let username_uid = uid(16);
        await window.confirmationResult
            .confirm(opt)
            .then(async (res) => {
                await setDoc(doc(db, "users", username_uid), {
                    uid: username_uid,
                    isFounder: true,
                    phone: res.user.phoneNumber,
                    type: "admin",
                    username: username,
                })
                    .then(async () => {
                        await setDoc(doc(db, "companies", company_uid), {
                            uid: company_uid,
                            company: company,
                            users: [username_uid],
                        }).then(() => {
                            setAuth((prev) => ({
                                ...prev,
                                uid: username_uid,
                                isAuth: true,
                                user: username,
                                type: "admin",
                                phone: res.user.phoneNumber,
                            }));
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setExist(false);
        let rs = await doesPhoneExist(phone);
        if (rs) {
            setExist(true);
        } else {
            if (optclicked === false) {
                onSignup();
            } else {
                onOTPVerify();
            }
        }
    };

    const doesPhoneExist = async (phone) => {
        const q = query(collection(db, "users"), where("phone", "==", phone));

        const querySnapshot = await getDocs(q);
        let rs = querySnapshot.docs.length;
        return rs;
    };
    return (
        <div className="register divider">
            <div className="left divider">
                <h2 className="logo">InsuraPro</h2>
            </div>
            <div className="right divider">
                <h1 className="reveal reveal12">Join Us !</h1>
                <p className="desc reveal reveal12">
                    Create an account for your insurance company and manage it
                    remotely using our software InsuraPro.
                </p>
                <form className="reveal reveal08" onSubmit={handleSubmit}>
                    <Input
                        name="company"
                        placeholder="Company"
                        type="text"
                        Icon={AiOutlineBank}
                        value={company}
                        onChange={setCompany}
                    />
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
                    {exist && <p id="exist">Phone number already exist !</p>}
                    {optclicked && (
                        <Input
                            pattern="[0-9]{6}"
                            name="opt"
                            placeholder="123456"
                            type="number"
                            Icon={AiOutlineBlock}
                            value={opt}
                            onChange={setOpt}
                        />
                    )}
                    <Button
                        text={optclicked ? "Register" : "Send"}
                        type="submit"
                    />
                    <div className="input_links">
                        <p>
                            Already a member ? ?{" "}
                            <span
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Sign in
                            </span>
                        </p>
                    </div>{" "}
                </form>
                <p className="footer">
                    Contact us at
                    <span> contact.geniuswave@gmail.com</span>
                </p>
            </div>
            <div id="sign-in-button"></div>
        </div>
    );
};

export default Register;
