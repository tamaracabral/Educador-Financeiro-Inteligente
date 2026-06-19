import { useState } from 'react'

import { buildFinancialEducatorContext } from '@/data/financialEducatorPrompt'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import {
  type ChatMessage,
  getFinancialEducatorResponse,
} from '@/service/aiService'
import {
  getChatHistory,
  saveChatHistory,
} from '@/storage/financialEducatorChatStorage'

export function useFinancialEducatorChat(simulationId: string) {
  const { getFormData } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getChatHistory(simulationId),
  )
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestResponse = async (conversation: ChatMessage[]) => {
    const simulation = getFormData(simulationId)

    if (!simulation) {
      setError('Não foi possível encontrar os dados desta simulação.')
      return
    }

    setIsSending(true)
    setError(null)

    try {
      const context = buildFinancialEducatorContext(simulation)
      const response = await getFinancialEducatorResponse(context, conversation)

      setMessages((current) => {
        const messagesWithResponse: ChatMessage[] = [
          ...current,
          {
            id: crypto.randomUUID(),
            role: 'model',
            content: response,
          },
        ]

        saveChatHistory(simulationId, messagesWithResponse)
        return messagesWithResponse
      })
    } catch {
      setError('Não foi possível responder agora. Tente novamente.')
    } finally {
      setIsSending(false)
    }
  }

  const sendMessage = async (content: string) => {
    const question = content.trim()

    if (!question || isSending) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
    }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    saveChatHistory(simulationId, updatedMessages)
    await requestResponse(updatedMessages)
  }

  const retryLastMessage = async () => {
    if (isSending || messages.length === 0) {
      return
    }

    await requestResponse(messages)
  }

  return { error, isSending, messages, retryLastMessage, sendMessage }
}
