import React from "react";
import { auth } from "../firebase/auth/auth";
import { listUsers, listApprovedRequests } from "../firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { FetchedApprovedRequestsType } from "../types/fetchedApprovedRequests.type";

function Main() {
    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(user);
    }, []);

    const getApprovedRequestsFromFirebase = async () => {
        if (user) {
            const fetchedApprovedRequests: FetchedApprovedRequestsType[] =
                await listApprovedRequests();
            if (fetchedApprovedRequests) {
                setUsers(fetchedApprovedRequests);
            } else {
                return null;
            }
        }
    };

    getApprovedRequestsFromFirebase();

    return (
        <>
            <div>
                Main
                {users.map(req => {
                    return <li> {req?.requestedBy}</li>;
                })}
            </div>
        </>
    );
}

export default Main;
