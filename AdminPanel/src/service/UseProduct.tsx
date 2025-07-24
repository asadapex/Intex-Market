import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"
import type { Product } from "../components/productWrapper/ProductWrapper"

export const useProduct = () => {
    const queryClient = useQueryClient()

    const getProducts = () =>
        useQuery({
            queryKey: ['products'],
            queryFn: () => api.get('product').then(res => res.data),
        })

    const postProduct = () =>
        useMutation({
            mutationFn: (body: Product) => api.post('product', body).then(res => res.data),
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['products']})
        })  


    const deleteProduct = () =>
        useMutation({
          mutationFn: (id: string) => api.delete(`product/${id}`).then(res => res.data),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
        })

    const updateProduct = (id: string) =>
        useMutation({
          mutationFn: (body: Product) => api.patch(`product/${id}`, body).then(res => res.data),
          onSuccess: () => queryClient.invalidateQueries({queryKey: ['products']})
        })

    return {
        getProducts,
        postProduct,
        deleteProduct,
        updateProduct
    }
}
