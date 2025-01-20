import { useEffect } from "react";
import { AdminAuthenticated } from "@/services/graphql/types/codegen";
import { useMeMutation } from "@/services/graphql/hooks/AdminMutations";
import { useAuthStore } from "@/services/stores/AuthStore";

export default function useLoginPersistance(
    isLoading: boolean,
    setIsLoading: (loading: boolean) => void,
) {
    const [meMutation] = useMeMutation();

    useEffect(() => {
        if (isLoading) {
            meMutation().then(response => {
                const { data } = response;
                if (data) {
                    const { me } = data as { me: AdminAuthenticated };
                    if (me.__typename === "AdminAuthenticated") {
                        useAuthStore.setState({ admin: me });
                    }
                }
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });
        }
    }, [isLoading, meMutation, setIsLoading]);
}