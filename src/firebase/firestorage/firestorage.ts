import {
    StorageReference,
    getDownloadURL,
    listAll,
    ref,
    uploadBytes,
} from "firebase/storage";
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
        await uploadBytes(imageRef, imageUpload[0]);

        updateUserProfilePic(
            user[0],
            `profilePictures/${imageUpload[0].name + user[0].uid}`,
            await getUrl(`profilePictures/${imageUpload[0].name + user[0].uid}`)
        );
        alert("image uploaded!");
    } catch (err) {
        console.log(err);
    }
};

async function getUrl(userProfilePicLocation: string) {
    const imageRef: StorageReference = ref(storage, "profilePictures/");
    let urlRef;
    const response = await listAll(imageRef);
    for (const item of response.items) {
        if (item.fullPath.includes(userProfilePicLocation)) {
            const url = await getDownloadURL(item);
            urlRef = url;
            break;
        }
    }
    return urlRef;
}
