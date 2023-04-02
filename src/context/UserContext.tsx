import { createContext, useState, useEffect } from "react";
import { listUsers } from "../firebase/firestore/firestore";
import { UserType } from "../types";

type UserContextType = {
    userRequests: UserType[];
    loading: boolean;
    error: string | null;
};

const UserContext = createContext<UserContextType>({
    userRequests: [],
    loading: false,
    error: null,
});

//fix this to not be any//
export const UserProvider: React.FC<any> = ({ children }) => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await listUsers();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                const anyError: any = error;
                setError(anyError.message);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const value: UserContextType = {
        userRequests: users,
        loading,
        error,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
