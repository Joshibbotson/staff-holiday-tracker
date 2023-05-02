import { ref, uploadBytes } from "firebase/storage";
import { UserType } from "../../types";
import { updateUserProfilePic } from "../firestore/firestore";
import { storage } from "../firebase";

export const uploadImage = async (
    imageUpload: FileList | null,
    user: UserType[]
) => {
    if (!imageUpload) {
        return;
    }
    const imageRef = ref(
        storage,
        `profilePictures/${imageUpload[0].name + user[0].uid}`
    );

    try {
        uploadBytes(imageRef, imageUpload[0]);
        updateUserProfilePic(
            user[0],
            `profilePictures/${imageUpload[0].name + user[0].uid}`
        );
        alert("image uploaded!");
    } catch (err) {
        console.log(err);
    }
};
