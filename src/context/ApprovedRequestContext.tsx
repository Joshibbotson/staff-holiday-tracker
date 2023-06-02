import { createContext, useState, useEffect } from "react";
import { listApprovedRequests } from "../firebase/firestore/requests/listApprovedRequests";
import { ApprovedRequestsType, IncomingRequestsType } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/auth/auth";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { approvedReqCache } from "../caching/approveReqCache";
import { query, collection, where, onSnapshot } from "firebase/firestore";

type ApprovedRequestContextType = {
    approvedRequests: ApprovedRequestsType[] | undefined;
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
    const month = useSelector(
        (state: RootState) => state.currentDateSlice.month
    );
    const year = useSelector((state: RootState) => state.currentDateSlice.year);

    let cacheKey: string = `approvedRequestContext - ${month} - ${year}`;

    useEffect(() => {
        if (user) {
            if (approvedReqCache[cacheKey]) {
                setApprovedReqs(approvedReqCache[cacheKey]!);
                setLoading(false);
            } else {
                const fetchRequests = async () => {
                    setLoading(true);
                    try {
                        const data = await listApprovedRequests(month, year);
                        setApprovedReqs(data);
                        approvedReqCache[cacheKey] = data;
                        setLoading(false);
                    } catch (error) {
                        const anyError: any = error;
                        setError(anyError.message);
                        setLoading(false);
                    }
                };
                fetchRequests();
            }
            // listen for new requests and update requests if new request added
            const q = query(collection(db, "approvedRequests"));
            const unsubscribe = onSnapshot(q, querySnapshot => {
                const requests: ApprovedRequestsType[] = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data() as ApprovedRequestsType;
                    data.uid = doc.id;
                    requests.push(data);
                });
                if (approvedReqCache[cacheKey]) {
                    approvedReqCache[cacheKey] = requests;
                    setApprovedReqs(approvedReqCache[cacheKey]!);
                } else {
                    setApprovedReqs(requests);
                }
            });
            return () => unsubscribe();
        }
    }, [user, month, year]);

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
