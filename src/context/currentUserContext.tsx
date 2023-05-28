import { createContext, useState, useEffect } from "react";
import { getUserData } from "../firebase/firestore/firestore";
import { UserType } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/auth/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";

type CurrentUserContextType = {
    user: UserType[];
    loading: boolean;
    error: string | null;
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
    user: [],
    loading: false,
    error: null,
});

//fix this to not be any//
export const CurrentUserProvider: React.FC<any> = ({ children }) => {
    const [user, loadingAuth, errorAuth] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            const q = query(
                collection(db, "users"),
                where("email", "==", user?.email)
            );
            const unsubscribe = onSnapshot(q, querySnapshot => {
                const updatedUser: UserType[] = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data() as UserType;
                    data.uid = doc.id;
                    updatedUser.push(data);
                });
                setCurrentUser(updatedUser);
            });
            return () => unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const fetchCurrentUser = async () => {
                setLoading(true);
                try {
                    const data = await getUserData(user.uid);
                    setCurrentUser(data);
                    setLoading(false);
                } catch (error) {
                    const anyError: any = error;
                    setError(anyError.message);
                    setLoading(false);
                }
            };
            fetchCurrentUser();
        }
        if (!user) {
            setCurrentUser([]);
        }
    }, [user]);

    const value: CurrentUserContextType = {
        user: currentUser,
        loading,
        error,
    };

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export default CurrentUserProvider;
