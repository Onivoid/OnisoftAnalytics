import { useState, useEffect } from "react";
import { useAuthStore } from "@/services/stores/AuthStore";
import { AdminAuthenticated } from "@/services/graphql/types/codegen";
import useLoginPersistance from "@/services/auth/LoginPersistance";
import { LoginComponent } from "./components/custom/LoginComponent";

function App() {
    const admin: AdminAuthenticated | null = useAuthStore(
        (state) => state.admin,
    );
    const [isLoading, setIsLoading] = useState<boolean>(admin === null);
    useLoginPersistance(isLoading, setIsLoading);
    useEffect(() => {
        console.log("admin", admin);
        console.log("isLoading", isLoading);
    }, [admin, isLoading]);
    return (
        <div className="flex justify-center items-center min-h-screen">
            {isLoading ? (
                <div>Loading...</div>
            ) : admin ? (
                <div>Welcome back, {admin.username}</div>
            ) : (
                <LoginComponent />
            )}
        </div>
    );
}

export default App;
