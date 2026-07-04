import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, name, rows = 4, className = '', ...rest },
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
      <textarea
        ref={ref}
        id={fieldId}
        name={name}
        rows={rows}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={errorId ?? hintId}
        className={`w-full resize-none rounded-none border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] placeholder:text-[#aaa] focus:outline-none focus-visible:border-[#C1121F] ${className}`.trim()}
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

export default Textarea
