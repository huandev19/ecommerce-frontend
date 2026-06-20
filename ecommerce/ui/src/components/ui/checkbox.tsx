import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@ui/lib/utils"

const checkboxVariants = cva(
    "peer h-4 w-4 shrink-0 rounded-sm border border-border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
                outline: "data-[state=checked]:bg-transparent data-[state=checked]:text-primary data-[state=checked]:border-primary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function CheckMark() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked">,
    VariantProps<typeof checkboxVariants> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, variant, checked, onCheckedChange, disabled, ...props }, ref) => {
        const [isChecked, setIsChecked] = React.useState(checked ?? false);

        React.useEffect(() => {
            if (checked !== undefined) {
                setIsChecked(checked);
            }
        }, [checked]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = e.target.checked;
            setIsChecked(newChecked);
            onCheckedChange?.(newChecked);
        };

        return (
            <label className={cn("inline-flex items-center gap-2 cursor-pointer", disabled && "cursor-not-allowed opacity-50")}>
                <span
                    className={cn(
                        checkboxVariants({ variant, className }),
                        "relative inline-flex items-center justify-center",
                        isChecked && "bg-primary border-primary text-primary-foreground"
                    )}
                >
                    <input
                        type="checkbox"
                        ref={ref}
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={disabled}
                        className="sr-only"
                        {...props}
                    />
                    {isChecked && <CheckMark />}
                </span>
            </label>
        )
    }
)
Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants }
