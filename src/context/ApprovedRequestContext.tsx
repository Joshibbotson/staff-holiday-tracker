import { createContext, useState, useEffect } from "react";
import { listRequests } from "../firebase/firestore/firestore";
import { RequestsType } from "../types";

type RequestContextType = {
    requests: RequestsType[];
    loading: boolean;
    error: string | null;
};

const RequestContext = createContext<RequestContextType>({
    userRequests: [],
    loading: false,
    error: null,
});

//fix this to not be any//
export const UserProvider: React.FC<any> = ({ children }) => {
    const [userRequests, setUserRequests] = useState<RequestsType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const data = await listRequests();
                setUserRequests(data);
                setLoading(false);
            } catch (error) {
                const anyError: any = error;
                setError(anyError.message);
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const value: UserContextType = {
        userRequests,
        loading,
        error,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
