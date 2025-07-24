import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"

export interface ConsultationParams {
    name: string
}

export const useConsultation = () => {
    const queryClient = useQueryClient()

    const getConsultations = (params: ConsultationParams) =>
        useQuery({
            queryKey: ['consultations', params],
            queryFn: () => api.get('consultation', { params }).then(res => res.data),
        })

    const deleteConsultations = () =>
        useMutation({
            mutationFn: (id: string) => api.delete(`consultation/${id}`).then(res => res.data),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['consultations'] })
        })

    const updateConsultations = () =>
        useMutation({
            mutationFn: ({ id, check }: { id: string; check: boolean }) =>
                api.patch(`consultation/${id}`, { check }).then(res => res.data),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['consultations'] }),
        })

    return {
        getConsultations,
        deleteConsultations,
        updateConsultations
    }
}
