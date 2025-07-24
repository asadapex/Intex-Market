import React, { useState } from 'react'
import ConsultCard from '../card/ConsultCard'
import { useConsultation, type ConsultationParams } from '../../service/UseConsult'
import toast from 'react-hot-toast'
import { useParamsHook } from '../../shared/hooks/UseSearchParams'

interface Consultation {
    id: string
    name: string
    phone: string
}

const ConsultWrapper = () => {

    const {getParam} = useParamsHook()  
  
    const search = getParam("search") || ""

    const queryParams: ConsultationParams = {
      name: search,
    }

  const [completedIds, setCompletedIds] = useState<string[]>([])

  const { getConsultations, deleteConsultations } = useConsultation()
  const { data } = getConsultations(queryParams)
  const allconsultations: Consultation[] = data?.data || []

  const { mutate: deleteConsultation } = deleteConsultations()

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this consultation?')) return

    deleteConsultation(id, {
      onSuccess: () => toast.success('Consultation deleted successfully'),
      onError: () => toast.error('Failed to delete consultation'),
    })
  }

    const toggleCompleted = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id)
        ? prev.filter(completedId => completedId !== id)
        : [...prev, id]
    )

    toast.success(
      completedIds.includes(id)
        ? 'Marked as not completed'
        : 'Marked as completed'
    )
    }

  return (
    <>
      {allconsultations?.map((consultation: any) => (
        <ConsultCard
          key={consultation.id}
          name={consultation.name}
          phone={consultation.phone}
          time={new Date(consultation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          date={new Date(consultation.createdAt).toLocaleDateString()}
          isCompleted={completedIds.includes(consultation.id)}
          onToggleCompleted={() => toggleCompleted(consultation.id)} 
          onDelete={() => handleDelete(consultation.id)}
        />
      ))}
    </>
  )
}

export default React.memo(ConsultWrapper)
