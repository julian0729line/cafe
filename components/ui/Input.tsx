import { forwardRef, type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, name, className = '', ...rest },
  ref
) {
  const fieldId = id ?? name
  const hintId = hint && fieldId ? `${fieldId}-hint` : undefined
  const errorId = error && fieldId ? `${fieldId}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label
          htmlFor={fieldId}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A5728]"
        >
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={fieldId}
        name={name}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={errorId ?? hintId}
        className={`min-h-11 w-full rounded-sm border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] placeholder:text-[#6B6355] focus:outline-none focus-visible:border-[#C1121F] ${className}`.trim()}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="text-xs text-[#960E17]">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-[#8C8373]">
          {hint}
        </p>
      ) : null}
    </div>
  )
})

export default Input
