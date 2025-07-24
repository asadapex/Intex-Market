import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"

export interface OrderParams {
    name: string
}

export const useOrder = () => {
    const queryClient = useQueryClient()

    const getOrders = (params: OrderParams) =>
        useQuery({
            queryKey: ['orders', params],
            queryFn: () => api.get('order', { params }).then(res => res.data),
        })

    const deleteOrder = () =>
        useMutation({
            mutationFn: (id: string) => api.delete(`order/${id}`).then(res => res.data),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] })
        })

    const updateOrder = () =>
        useMutation({
            mutationFn: ({ id, check }: { id: string; check: boolean }) =>
                api.patch(`order/${id}`, { check }).then(res => res.data),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
        })

    return {
        getOrders,
        deleteOrder,
        updateOrder
    }
}
