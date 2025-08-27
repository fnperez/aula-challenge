import React from 'react'

interface LabeledInputProps {
  label: string
  type?: React.HTMLInputTypeAttribute // "text" | "number" | "email" | etc.
  value: string | number
  onChange: (newValue: string | number) => void
  placeholder?: string
  className?: string
}

const LabeledInput = ({ label, type = 'text', value, onChange, placeholder, className = '' }: LabeledInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-600">{label}</label>
      <input
        type={type}
        className={`rounded border px-2 py-1 ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const inputValue = type === 'number' ? Number(e.target.value) : e.target.value
          onChange(inputValue)
        }}
      />
    </div>
  )
}

export default LabeledInput
