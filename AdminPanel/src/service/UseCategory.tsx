import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { api } from "../api"

export const useCategory = () => {
    const queryClient = useQueryClient()

    const getCategory = () =>
        useQuery({
            queryKey: ['category'],
            queryFn: () => api.get('category').then(res => res.data),
        })

    const createCategory = useMutation({
        mutationFn: (categoryData: { name_ru: string; name_uz: string }) =>
            api.post('category', categoryData).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] })
        },
        onError: (error) => {
            console.error('Error creating category:', error)
        }
    })

    const updateCategory = useMutation({
        mutationFn: (data: { id: string; name_ru: string; name_uz: string }) => {
            const { id, ...categoryData } = data;
            return api.patch(`category/${id}`, categoryData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] })
        },
        onError: (error) => {
            console.error('Error updating category:', error)
        }
    })

    const deleteCategory = useMutation({
        mutationFn: (id: string) =>
            api.delete(`category/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] })
        },
        onError: (error) => {
            console.error('Error deleting category:', error)
        }
    })

    return {
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}