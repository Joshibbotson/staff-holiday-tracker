import { createContext, useState, useEffect } from "react";
import {
    listApprovedRequests,
    listRequests,
} from "../firebase/firestore/firestore";
import { ApprovedRequestsType } from "../types";

type ApprovedRequestContextType = {
    approvedRequests: ApprovedRequestsType[];
    loading: boolean;
    error: string | null;
};

export const ApprovedRequestContext = createContext<ApprovedRequestContextType>(
    {
        approvedRequests: [],
        loading: false,
        error: null,
    }
);

//fix this to not be any//
export const ApprovedReqsProvider: React.FC<any> = ({ children }) => {
    const [approvedReqs, setApprovedReqs] = useState<ApprovedRequestsType[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const data = await listApprovedRequests();
                setApprovedReqs(data);
                setLoading(false);
            } catch (error) {
                const anyError: any = error;
                setError(anyError.message);
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const value: ApprovedRequestContextType = {
        approvedRequests: approvedReqs,
        loading,
        error,
    };

    return (
        <ApprovedRequestContext.Provider value={value}>
            {children}
        </ApprovedRequestContext.Provider>
    );
};

export default ApprovedReqsProvider;
