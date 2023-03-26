import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const auth = atom({
    key: "auth",
    default: {
        phone: null,
        uid: null,
        user: null,
        type: null,
        isAuth: false,
    },
    effects_UNSTABLE: [persistAtom],
});
