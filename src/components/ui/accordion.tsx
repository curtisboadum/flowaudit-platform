"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemData {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-[rgba(55,50,47,0.12)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-[#37322F] text-base font-medium leading-6 font-sans pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#605A57] shrink-0 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0",
        )}
      >
        <p className="text-[#605A57] text-sm leading-6 font-sans px-1">{answer}</p>
      </div>
    </div>
  );
}

export { Accordion, AccordionItem };
export type { AccordionProps, AccordionItemData };
