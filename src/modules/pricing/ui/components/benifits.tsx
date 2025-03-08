interface BenefitProps {
  text: string;
  checked: boolean;
}

export const Benefit = ({ text, checked }: BenefitProps) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-4 place-content-center rounded-full bg-primary text-sm text-primary-foreground">
          <Check className="size-3" />
        </span>
      ) : (
        <span className="grid size-4 place-content-center rounded-full bg-zinc-200 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          <X className="size-3" />
        </span>
      )}
      <span className="text-sm text-zinc-600 dark:text-zinc-300">{text}</span>
    </div>
  );
};
