import { createContext, useState, useEffect } from "react";
import { listRequestsForApproval } from "../firebase/firestore/firestore";
import { IncomingRequestsType } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/auth/auth";
import { awaitApprovReqCache } from "../caching/awaitApprovReqCache";

type AwaitApprovReqContextType = {
    requests: IncomingRequestsType[];
    loading: boolean;
    error: string | null;
};

export const AwaitApprovalReqContext = createContext<AwaitApprovReqContextType>(
    {
        requests: [],
        loading: false,
        error: null,
    }
);

//fix this to not be any//
export const AwaitApprovReqProvider: React.FC<any> = ({ children }) => {
    const [requestsForApproval, setRequestsForApproval] = useState<
        IncomingRequestsType[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, loadingUser, errorUser] = useAuthState(auth);

    let cacheKey: string = `requests ${user?.email}`;
    useEffect(() => {
        if (user) {
            if (awaitApprovReqCache[cacheKey]) {
                setRequestsForApproval(awaitApprovReqCache[cacheKey]!);
            } else {
                const fetchRequests = async () => {
                    setLoading(true);
                    try {
                        const data = await listRequestsForApproval(user.email!);
                        setRequestsForApproval(data);

                        awaitApprovReqCache[cacheKey] = data;
                        setLoading(false);
                    } catch (error) {
                        const anyError: any = error;
                        setError(anyError.message);
                        setLoading(false);
                    }
                };
                fetchRequests();
            }
            //Ensure userRequests is updated if requests collection changes//

            const q = query(
                collection(db, "requests"),
                where("approverEmail", "==", user?.email)
            );
            const unsubscribe = onSnapshot(q, querySnapshot => {
                const requests: IncomingRequestsType[] = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data() as IncomingRequestsType;
                    data.uid = doc.id;
                    requests.push(data);
                });
                setRequestsForApproval(requests);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const value: AwaitApprovReqContextType = {
        requests: requestsForApproval,
        loading,
        error,
    };

    return (
        <AwaitApprovalReqContext.Provider value={value}>
            {children}
        </AwaitApprovalReqContext.Provider>
    );
};

export default AwaitApprovReqProvider;
