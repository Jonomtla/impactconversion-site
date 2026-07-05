'use client';

interface InputFieldProps {
  label: string;
  hint?: string;
  value: number | string;
  onChange: (value: number) => void;
  step?: string;
  readOnly?: boolean;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  hint,
  value,
  onChange,
  step = '1',
  readOnly = false,
  prefix,
  suffix,
  placeholder,
}: InputFieldProps) {
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <div>
      <label htmlFor={id} className="flex items-center gap-2 mb-1.5 text-sm font-medium text-text">
        {label}
        {hint && (
          <span className="font-normal text-purple text-xs px-2 py-0.5 bg-purple-soft rounded-full">
            {hint}
          </span>
        )}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          min={0}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full py-3 bg-white border border-ink/15 rounded-xl text-base font-medium text-text
            placeholder:text-text-muted/60
            focus:outline-none focus:border-purple focus:ring-4 focus:ring-purple/10
            hover:border-ink/30
            transition-colors duration-150
            ${prefix ? 'pl-9 pr-4' : 'px-4'}
            ${suffix ? 'pr-11' : ''}
            ${readOnly ? 'bg-cream-2 text-text-muted cursor-default hover:border-ink/15' : ''}
          `}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-medium" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
