import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { type ChangeEvent, type SyntheticEvent, useState } from "react";

import { Button } from "@/components/shared/Button";
import type { InputProps } from "@/components/shared/Input";
import { Input } from "@/components/shared/Input";
import { formatBRLCurrencyInput } from "@/utils/currency";

export interface FormStepProps {
  id: string;
  icon: LucideIcon;
  title: string;
  question: string;
  inputProps?: InputProps;
  submitButtonProps?: {
    label?: string;
    emojiIcon?: string;
  };
}

interface ActionButtonsProps {
  onBack: () => void;
  onNext: (value: string) => void;
  hideBackButton?: boolean;
}

export function FormStep({
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
  hideBackButton,
  onBack,
  onNext,
}: FormStepProps & ActionButtonsProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(
      inputProps?.prefix === "R$" ? formatBRLCurrencyInput(value) : value,
    );
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    onNext(inputValue);
  };

  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="mb-4 flex h-15 w-15 items-center justify-center rounded-xl bg-primary">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
        {title}
      </h2>
      <h3 className="mb-6 text-xl leading-snug font-semibold text-foreground sm:text-2xl">
        {question}
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          {...inputProps}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {!hideBackButton && (
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
              icon={ArrowLeft}
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
            >
              Voltar
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            icon={!submitButtonProps ? ArrowRight : undefined}
            disabled={!inputValue}
            className="order-1 flex-1 sm:order-2"
          >
            {submitButtonProps?.label ?? "Próximo"}
            {submitButtonProps?.emojiIcon}
          </Button>
        </div>
      </form>
    </div>
  );
}
