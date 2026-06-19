import {
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/Simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

const getStoredSimulations = (): SimulationRecord[] => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!storage) {
    return []
  }

  try {
    const savedData = JSON.parse(storage) as unknown
    return Array.isArray(savedData) ? (savedData as SimulationRecord[]) : []
  } catch {
    return []
  }
}

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    }
    const savedData = getStoredSimulations()

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }

  const getFormData = (id: string) => {
    const savedData = getStoredSimulations()
    return savedData.find((record) => record.id === id) || null
  }

  const getAllFormData = () => getStoredSimulations()

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const savedData = getStoredSimulations()

    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return { saveFormData, getFormData, getAllFormData, updateSimulation }
}
