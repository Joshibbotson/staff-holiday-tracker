import { createContext, useState, useEffect } from "react";
import { listUsers } from "../firebase/firestore/firestore";
import { UserType } from "../types";

type UsersContextType = {
    users: UserType[];
    loading: boolean;
    error: string | null;
};

export const UsersContext = createContext<UsersContextType>({
    users: [],
    loading: false,
    error: null,
});

//fix this to not be any//
export const UsersProvider: React.FC<any> = ({ children }) => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await listUsers(false, false);
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

    const value: UsersContextType = {
        users: users,
        loading,
        error,
    };

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    );
};

export default UsersProvider;
