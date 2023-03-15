interface SingleValueProps {
  label: string;
  value: string;
}

export default function SingleValue({ label, value }: SingleValueProps) {
  return (
    <div>
      {label}: {value}
    </div>
  );
}
