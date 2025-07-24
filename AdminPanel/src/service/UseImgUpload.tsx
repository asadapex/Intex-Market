import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"

export const useImgUpload = () => {
    const queryClient = useQueryClient()

    const imgUpload = () =>
        useMutation({
            mutationFn: (body: any) => api.post('file', body).then(res => res.data),
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['imgUpload']})
        })

    return {
        imgUpload,
    }
}
