import { auth } from "../../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useState, useEffect } from "react";
import { ApprovedRequestsType } from "../../types/ApprovedRequests.type";
import { RequestsType } from "../../types/Requests.type";
import { UserType } from "../../types/UserType.type";
import { ApprovedRequestContext } from "../../context/ApprovedRequestContext";

function Main() {
    const [user, loading, error] = useAuthState(auth);
    const [approvedRequestsState, setApprovedRequestsState] = useState<
        ApprovedRequestsType[] | undefined
    >(undefined);
    const [requests, setRequests] = useState<RequestsType[] | undefined>(
        undefined
    );
    const [users, setUsers] = useState<UserType[] | undefined>(undefined);
    const { approvedRequests } = useContext(ApprovedRequestContext);

    useEffect(() => {
        if (approvedRequests) {
            setApprovedRequestsState(approvedRequests);
            console.log(approvedRequests);
        }
    }, [approvedRequests]);

    // const getApprovedRequestsFromFirebase = async () => {
    //     if (user) {
    //         const fetchedApprovedRequests: ApprovedRequestsType[] =
    //             await listApprovedRequests();
    //         if (fetchedApprovedRequests) {
    //             setApprovedRequests(fetchedApprovedRequests);
    //         } else {
    //             return null;
    //         }
    //     }
    // };
    // const getRequestsFromFirebase = async () => {
    //     if (user) {
    //         const fetchedRequests: RequestsType[] = await listRequests();
    //         if (fetchedRequests) {
    //             setRequests(fetchedRequests);
    //         } else {
    //             return null;
    //         }
    //     }
    // };
    // const getUsersFromFirebase = async () => {
    //     if (user) {
    //         const fetchedUsers: UserType[] = await listUsers();
    //         if (fetchedUsers) {
    //             setUsers(fetchedUsers);
    //         } else {
    //             return null;
    //         }
    //     }
    // };
    // getApprovedRequestsFromFirebase();

    return (
        <>
            <div>
                Main
                {approvedRequestsState
                    ? approvedRequestsState.map(req => {
                          return (
                              <>
                                  {console.log(
                                      req?.dateEnd.toDate().toDateString()
                                  )}
                                  <li> {req?.requestedBy}</li>
                                  <li>
                                      {" "}
                                      {req?.dateStart.toDate().toDateString()}
                                  </li>
                                  <li>
                                      {" "}
                                      {req?.dateEnd.toDate().toDateString()}
                                  </li>
                              </>
                          );
                      })
                    : ""}
            </div>
        </>
    );
}

export default Main;
