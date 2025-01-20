import { useLoginMutation } from "@/services/graphql/hooks/AdminMutations";
import { useRef } from "react";
import { useAuthStore } from "@/services/stores/AuthStore";

export function LoginComponent() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loginMutation] = useLoginMutation();
    const loginHandler = () => {
        loginMutation({
            variables: {
                username: usernameRef.current!.value,
                password: passwordRef.current!.value,
            },
        })
            .then((response) => {
                const { data } = response;
                if (data) {
                    const { login } = data;
                    if (login.__typename === "AdminAuthenticated") {
                        useAuthStore.setState({ admin: login });
                    }
                }
            })
            .catch((error) => {
                if (error) {
                    console.log("Login failed");
                    return;
                }
            });
    };
    return (
        <div>
            <p>Username</p>
            <input type="text" ref={usernameRef} className="text-background" />
            <p>Password</p>
            <input
                type="password"
                ref={passwordRef}
                className="text-background"
            />
            <button onClick={() => loginHandler()}>Login</button>
        </div>
    );
}
