"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value?: string;
  defaultValue?: string;
  options: (string | CustomSelectOption)[];
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  className?: string;
}

const MAX_HEIGHT = 260;

export default function CustomSelect({
  value: controlledValue,
  defaultValue,
  options: rawOptions,
  placeholder = "Pilih...",
  onChange,
  disabled = false,
  name,
  required = false,
  className = "",
}: CustomSelectProps) {
  const options: CustomSelectOption[] = rawOptions.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue ?? ""
  );
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<{
    left: number;
    top?: number;
    bottom?: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selectedIndex = options.findIndex((o) => o.value === currentValue);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 120);
  };

  const openDropdown = () => {
    if (disabled) return;
    if (!buttonRef.current) return;

    const r = buttonRef.current.getBoundingClientRect();
    const width = r.width;
    const below = window.innerHeight - r.bottom - 8;
    const above = r.top - 8;
    const up = below < Math.min(MAX_HEIGHT, options.length * 40 + 8) && above > below;

    setPos({
      left: r.left,
      width,
      maxHeight: Math.min(MAX_HEIGHT, (up ? above : below) - 4),
      ...(up ? { bottom: window.innerHeight - r.top + 4 } : { top: r.bottom + 4 }),
    });

    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
    setClosing(false);
  };

  const selectOption = (opt: CustomSelectOption) => {
    if (!isControlled) {
      setUncontrolledValue(opt.value);
    }
    onChange?.(opt.value);
    close();
    buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        !listRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        close();
      }
    };
    const handleScroll = (e: Event) => {
      if (!listRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleResize = () => setOpen(false);

    document.addEventListener("pointerdown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  useEffect(() => {
    if (open && listRef.current && listRef.current.children[active]) {
      (listRef.current.children[active] as HTMLElement).scrollIntoView({
        block: "nearest",
      });
    }
  }, [open, active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    const last = options.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((prev) => Math.min(prev + 1, last));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (options[active]) selectOption(options[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close();
    } else if (e.key === "Tab") {
      close();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => (open ? close() : openDropdown())}
        onKeyDown={onKeyDown}
        className={`field flex items-center justify-between text-left transition-all ${
          disabled
            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200"
            : "bg-white cursor-pointer hover:border-neutral-400"
        } ${open ? "border-brand ring-1 ring-brand/20" : ""}`}
      >
        <span
          className={`truncate text-sm ${
            !selectedOption || selectedOption.value === ""
              ? "text-neutral-400 font-normal"
              : "text-neutral-800"
          }`}
        >
          {selectedOption && selectedOption.value !== ""
            ? selectedOption.label
            : placeholder}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 ml-2 transition-transform duration-200 ${
            disabled ? "text-neutral-300" : "text-neutral-400"
          } ${open ? "rotate-180 text-brand" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Hidden input for HTML form compatibility */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={currentValue}
          required={required}
        />
      )}

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ position: "fixed" }}
          >
            <ul
              id={listId}
              ref={listRef}
              role="listbox"
              className={`pointer-events-auto fixed z-50 overflow-y-auto rounded-[6px] border border-neutral-200 bg-white py-1 shadow-lg ring-1 ring-black/5 transition-opacity duration-150 ${
                closing ? "opacity-0" : "opacity-100"
              }`}
              style={{
                left: pos?.left ?? 0,
                width: pos?.width ?? 200,
                maxHeight: pos?.maxHeight ?? MAX_HEIGHT,
                ...(pos?.bottom !== undefined
                  ? { bottom: pos.bottom }
                  : { top: pos?.top ?? 0 }),
              }}
            >
              {options.map((opt, i) => {
                const isSelected = opt.value === currentValue;
                const isActive = i === active;
                return (
                  <li
                    key={`${opt.value}-${i}`}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectOption(opt)}
                    className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? "bg-red-50 text-brand font-semibold"
                        : isActive
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-700"
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <svg
                        className="h-4 w-4 shrink-0 text-brand ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
