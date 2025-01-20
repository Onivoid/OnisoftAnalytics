import { useLoginMutation } from "@/services/graphql/hooks/AdminMutations";
import { useRef } from "react";
import { useAuthStore } from "@/services/stores/AuthStore";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Username</p>
                <Input type="text" ref={usernameRef} />
                <p>Password</p>
                <Input type="password" ref={passwordRef} />
            </CardContent>
            <CardFooter>
                <Button onClick={() => loginHandler()}>Login</Button>
            </CardFooter>
        </Card>
    );
}
