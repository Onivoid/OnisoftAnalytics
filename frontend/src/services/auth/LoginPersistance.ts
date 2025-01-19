import { useEffect } from "react";
import { AdminAuthenticated } from "@/services/graphql/types/codegen";
import { useMeMutation } from "@/services/graphql/hooks/AdminMutations";
import { useAuthStore } from "@/services/stores/AuthStore";

export default function useLoginPersistance(
    isLoading: boolean,
    setIsLoading: (loading: boolean) => void,
) {
    const [meMutation, { data, loading, error }] = useMeMutation();

    useEffect(() => {
        if (isLoading) {
            meMutation();
            if (!loading && data) {
                const { me } = data as { me: AdminAuthenticated };
                if (me.__typename === "AdminAuthenticated") {
                    useAuthStore.setState({ admin: me });
                }
            }
            setTimeout(() => setIsLoading(false), 2000);
        }
    }, [data, loading, error, isLoading, setIsLoading]);
}
