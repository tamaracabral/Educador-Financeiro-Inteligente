import type { ChatMessage } from '@/service/aiService'

const CHAT_STORAGE_PREFIX = 'financial-educator-chat'

const getStorageKey = (simulationId: string) =>
  `${CHAT_STORAGE_PREFIX}:${simulationId}`

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const message = value as Partial<ChatMessage>

  return (
    typeof message.id === 'string' &&
    (message.role === 'user' || message.role === 'model') &&
    typeof message.content === 'string'
  )
}

export function getChatHistory(simulationId: string): ChatMessage[] {
  const storage = localStorage.getItem(getStorageKey(simulationId))

  if (!storage) {
    return []
  }

  try {
    const messages = JSON.parse(storage) as unknown
    return Array.isArray(messages) ? messages.filter(isChatMessage) : []
  } catch {
    return []
  }
}

export function saveChatHistory(simulationId: string, messages: ChatMessage[]) {
  try {
    localStorage.setItem(getStorageKey(simulationId), JSON.stringify(messages))
  } catch {
    return false
  }

  return true
}
