import { AlertCircle, Bot, RefreshCw, Send, User } from "lucide-react";
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { useFinancialEducatorChat } from "@/hooks/useFinancialEducatorChat";

interface FinancialEducatorChatProps {
  simulationId: string;
}

export function FinancialEducatorChat({
  simulationId,
}: FinancialEducatorChatProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { error, isSending, messages, retryLastMessage, sendMessage } =
    useFinancialEducatorChat(simulationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isSending, messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = inputValue.trim();

    if (!message || isSending) {
      return;
    }

    setInputValue("");
    await sendMessage(message);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <section className="mt-6 border-t border-border pt-6">
      <div className="mb-4 flex items-center gap-2">
        <Bot size={20} className="text-primary" />
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Converse com o Educador Financeiro
          </h3>
          <p className="text-xs text-muted-foreground">
            Tire dúvidas sobre sua simulação e seus próximos passos.
          </p>
        </div>
      </div>

      <div
        className="mb-4 flex max-h-80 flex-col gap-3 overflow-y-auto rounded-xl bg-background p-4"
        aria-live="polite"
        aria-busy={isSending}
      >
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot size={15} />
          </div>
          <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-card px-4 py-3 text-sm leading-relaxed text-foreground">
            Olá! Posso explicar seu diagnóstico e ajudar a planejar os próximos
            passos. O que você gostaria de saber?
          </p>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.role === "user" ? "justify-end" : ""}`}
          >
            {message.role === "model" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot size={15} />
              </div>
            )}
            <p
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "rounded-tr-sm bg-primary text-primary-foreground"
                  : "rounded-tl-sm bg-card text-foreground"
              }`}
            >
              {message.content}
            </p>
            {message.role === "user" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-button text-foreground">
                <User size={15} />
              </div>
            )}
          </div>
        ))}

        {isSending && (
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot size={15} />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-card px-4 py-4">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              <span className="sr-only">Preparando resposta</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-2 text-sm text-red-500">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => void retryLastMessage()}
            disabled={isSending || messages.length === 0}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Tentar novamente
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <textarea
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex.: Como posso reduzir meus gastos mensais?"
          rows={2}
          maxLength={500}
          disabled={isSending}
          aria-label="Pergunta para o educador financeiro"
          className="min-h-12 flex-1 resize-none rounded-xl bg-input px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          aria-label="Enviar pergunta"
          disabled={!inputValue.trim() || isSending}
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={19} />
        </button>
      </form>
    </section>
  );
}
