import { createContext, useState, useEffect } from "react";
import { listRequests } from "../firebase/firestore/firestore";
import { IncomingRequestsType } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth/auth";

type RequestContextType = {
    requests: IncomingRequestsType[];
    loading: boolean;
    error: string | null;
};

export const RequestContext = createContext<RequestContextType>({
    requests: [],
    loading: false,
    error: null,
});

//fix this to not be any//
export const RequestsProvider: React.FC<any> = ({ children }) => {
    const [userRequests, setUserRequests] = useState<IncomingRequestsType[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, loadingUser, errorUser] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            const fetchRequests = async () => {
                setLoading(true);
                try {
                    const data = await listRequests(user.email!);
                    setUserRequests(data);
                    setLoading(false);
                } catch (error) {
                    const anyError: any = error;
                    setError(anyError.message);
                    setLoading(false);
                }
            };
            fetchRequests();
        }
    }, []);

    const value: RequestContextType = {
        requests: userRequests,
        loading,
        error,
    };

    return (
        <RequestContext.Provider value={value}>
            {children}
        </RequestContext.Provider>
    );
};

export default RequestsProvider;
