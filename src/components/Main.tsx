import React from "react";
import { auth } from "../firebase/auth/auth";
import {
    listUsers,
    listApprovedRequests,
    listRequests,
} from "../firebase/firestore/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { ApprovedRequestsType } from "../types/ApprovedRequests.type";
import { RequestsType } from "../types/Requests.type";
import { UserType } from "../types/UserType.type";

function Main() {
    const [user, loading, error] = useAuthState(auth);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);

    const getApprovedRequestsFromFirebase = async () => {
        if (user) {
            const fetchedApprovedRequests: ApprovedRequestsType[] =
                await listApprovedRequests();
            if (fetchedApprovedRequests) {
                setUsers(fetchedApprovedRequests);
            } else {
                return null;
            }
        }
    };
    const getRequestsFromFirebase = async () => {
        if (user) {
            const fetchedRequests: RequestsType[] = await listRequests();
            if (fetchedRequests) {
                setUsers(fetchedRequests);
            } else {
                return null;
            }
        }
    };
    const getUsersFromFirebase = async () => {
        if (user) {
            const fetchedUsers: UserType[] = await listUsers();
            if (fetchedUsers) {
                setUsers(fetchedUsers);
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
