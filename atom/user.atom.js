import { DEFAULTS } from "@/helper/constants.helper";
import { atom } from "recoil";

export const CurrentUserAtom = atom({
  key: "currentUser",
  default: getUserDataObj(),
});

export function getUserDataObj(data = {}) {
  return {
    uid: data?.uid || null,
    displayName: data?.displayName || null,
    email: data?.email || null,
    photoURL: data?.photoURL || DEFAULTS?.profilePic,
    address: data?.address || null,
    vpa: data?.vpa || null,
    isAdmin: data?.isAdmin || false,
  };
}
