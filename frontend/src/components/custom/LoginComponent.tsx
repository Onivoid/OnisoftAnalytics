import { useLoginMutation } from "@/services/graphql/hooks/AdminMutations";
import { useRef } from "react";

export function LoginComponent() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loginMutation, { data, error/* , loading, error */ }] = useLoginMutation();
    const loginHandler = () => {
        loginMutation({
            variables: {
                username: usernameRef.current!.value,
                password: passwordRef.current!.value,
            }
        }).then(() => {
            if (error) {
                console.log('Login failed');
                return;
            } else if (data) {
                console.log('Login successful');
                console.log(data);
            }
        });
    };
    return (
        <div>
            <p>Username</p>
            <input type="text" ref={usernameRef} className="text-background"/>
            <p>Password</p>
            <input type="password" ref={passwordRef} className="text-background"/>
            <button onClick={() => loginHandler()}>Login</button>
        </div>
    );
}