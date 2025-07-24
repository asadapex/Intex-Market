import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"

export interface Auth {
    username: string,
    password: string
}   

export const useAuth = () => {
    const queryClient = useQueryClient()

    const login = () =>
        useMutation({
            mutationFn: (body: Auth) => api.post('admin/login', body).then(res => res.data),
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['auth']})
        })

    return {
        login,
    }
}
