import React from "react"
import { auth } from "../firebase/auth/auth"
import { listUsers, listApprovedRequests } from "../firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"

function Main() {
    const [user, loading, error] = useAuthState(auth)
    const [users, setUsers] = useState([])

    const getUsersFromFirebase = async () => {
        if (user) {
            const fetchedUsers = await listUsers()
            if (fetchedUsers) {
                setUsers(fetchedUsers)
            } else {
                return null
            }
        }
    }

    getUsersFromFirebase()

    // useEffect(() => {
    //     console.log(users)
    // }, [users])

    return (
        <>
            <div>
                Main
                {users.map(user => {
                    return <li> {user.name}</li>
                })}
            </div>
        </>
    )
}

export default Main
