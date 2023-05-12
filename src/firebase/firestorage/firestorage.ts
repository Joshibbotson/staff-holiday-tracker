import {
    StorageReference,
    deleteObject,
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

    const userProfilePicLocation = `profilePictures/${
        imageUpload[0].name + user[0].uid
    }`;

    // Check if the user has an existing profile picture
    if (user[0].profilePic) {
        // Delete the existing profile picture
        const existingImageRef = ref(storage, user[0].profilePic);
        try {
            await deleteObject(existingImageRef);
            console.log("Existing image deleted!");
        } catch (err) {
            console.log("Error deleting existing image:", err);
        }
    }

    const imageRef = ref(storage, userProfilePicLocation);

    try {
        await uploadBytes(imageRef, imageUpload[0]);
        updateUserProfilePic(
            user[0],
            userProfilePicLocation,
            await getUrl(userProfilePicLocation)
        );
        alert("Image uploaded!");
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
