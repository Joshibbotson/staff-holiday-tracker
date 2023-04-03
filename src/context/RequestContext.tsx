import { createContext, useState, useEffect } from "react";
import { listRequests } from "../firebase/firestore/firestore";
import { RequestsType } from "../types";

type RequestContextType = {
    requests: RequestsType[];
    loading: boolean;
    error: string | null;
};

const RequestContext = createContext<RequestContextType>({
    requests: [],
    loading: false,
    error: null,
});

//fix this to not be any//
export const RequestsProvider: React.FC<any> = ({ children }) => {
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
