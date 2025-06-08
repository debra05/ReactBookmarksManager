
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();


const Loader = () => {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        loadUser();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
