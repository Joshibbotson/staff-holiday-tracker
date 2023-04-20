import { createContext, useState, useEffect } from "react";
import { listApprovedRequests } from "../firebase/firestore/firestore";
import { ApprovedRequestsType, IncomingRequestsType } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/auth/auth";
import { onSnapshot, collection, query, where } from "firebase/firestore";

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
    const [user, loadingUser, errorUser] = useAuthState(auth);
    const [approvedReqs, setApprovedReqs] = useState<ApprovedRequestsType[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    //Ensure approvedUserRequests is updated if requests collection changes//
    useEffect(() => {
        const q = query(
            collection(db, "approvedRequests")
            // where("requestByEmail", "==", user?.email)
        );

        const unsubscribe = onSnapshot(q, snapshot => {
            const requests: IncomingRequestsType[] = [];
            snapshot.forEach(doc => {
                const data = doc.data() as IncomingRequestsType;
                data.uid = doc.id;
                requests.push(data);
            });
            setApprovedReqs(requests);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
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
        }
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
