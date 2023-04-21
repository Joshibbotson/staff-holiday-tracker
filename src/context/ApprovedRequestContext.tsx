import { createContext, useState, useEffect, useContext } from "react";
import { listApprovedRequests } from "../firebase/firestore/firestore";
import { ApprovedRequestsType, IncomingRequestsType } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/auth/auth";
import {
    onSnapshot,
    collection,
    query,
    where,
    or,
    and,
    orderBy,
} from "firebase/firestore";
import { SelectedMonthContext } from "./SelectedMonth";
import { SelectedYearContext } from "./SelectedYear";

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
    const { month } = useContext(SelectedMonthContext);
    const { year } = useContext(SelectedYearContext);

    //Ensure approvedUserRequests is updated if requests collection changes//
    // will need adjusting to only show current month and year requests
    useEffect(() => {
        const startMonth = new Date(Date.UTC(year, month - 1, 1));
        const endMonth = new Date(Date.UTC(year, month - 1, 1));
        //adjust end date to be last millisecond of the previous day
        endMonth.setTime(endMonth.getTime() - 1);

        const q = query(collection(db, "approvedRequests"));

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
                    const data = await listApprovedRequests(month, year);
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
