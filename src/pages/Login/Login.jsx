import { useState, useEffect } from "react";
import "./Login.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { AiOutlinePhone, AiOutlineBlock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { reveal } from "../../utils/Animation.js";
import { authentication, db } from "../../atoms/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [opt, setOpt] = useState("");
    const [user, setUser] = useState();
    const [exist, setExist] = useState(false);
    const [optclicked, setOptclicked] = useState(false);
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(auth);

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

    const getUserIdByPhone = async (phone) => {
        const q = query(collection(db, "users"), where("phone", "==", phone));

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs[0]._document.data.value.mapValue.fields.uid
            .stringValue;
    };

    const onOTPVerify = async () => {
        await window.confirmationResult
            .confirm(opt)
            .then(async (res) => {
                let uid = await getUserIdByPhone(res.user.phoneNumber);
                setAuth((prev) => ({
                    ...prev,
                    isAuth: true,
                    user: user[0]._document.data.value.mapValue.fields.username
                        .stringValue,
                    type: user[0]._document.data.value.mapValue.fields.type
                        .stringValue,
                    phone: res.user.phoneNumber,
                    uid: uid,
                }));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        reveal();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setExist(false);
        let rs = await doesPhoneExist(phone);
        if (rs) {
            if (optclicked === false) {
                onSignup();
            } else {
                onOTPVerify();
            }
        } else {
            setExist(true);
        }
    };

    const doesPhoneExist = async (phone) => {
        const q = query(collection(db, "users"), where("phone", "==", phone));

        const querySnapshot = await getDocs(q);
        let rs = querySnapshot.docs.length;
        if (rs) {
            setUser(querySnapshot.docs);
            return rs;
        } else {
            return rs;
        }
    };
    return (
        <div className="login divider">
            <div className="left divider">
                <h2 className="logo">InsuraPro</h2>
            </div>
            <div className="right divider">
                <h1 className="reveal reveal12">Hello Again !</h1>
                <p className="reveal reveal12 desc">
                    Welcome to <span>InsuraPro,</span> a tool that helps
                    insurance companies organize their work.
                </p>

                <form className="reveal reveal08" onSubmit={handleSubmit}>
                    <Input
                        pattern="[+]{1}[1-9]{1,3}[0-9]{9}"
                        name="phone"
                        placeholder="+33 123 456 789"
                        type="tel"
                        Icon={AiOutlinePhone}
                        value={phone}
                        onChange={setPhone}
                    />
                    {exist && (
                        <p id="exist">This phone number does not exist !</p>
                    )}
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
                        text={optclicked ? "Login" : "Send"}
                        type="submit"
                    />{" "}
                    <div className="input_links">
                        <p>
                            Not a member ?{" "}
                            <span
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Join us
                            </span>
                        </p>
                    </div>
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

export default Login;
