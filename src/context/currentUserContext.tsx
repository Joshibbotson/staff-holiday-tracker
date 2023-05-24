import { createContext, useState, useEffect } from "react";
import { getUserData } from "../firebase/firestore/firestore";
import { UserType } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
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
