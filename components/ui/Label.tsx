const Label = ({ text, htmlFor }: { text: string; htmlFor?: string }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm text-muted mb-1 block">
      {text}
    </label>
  );
};

export default Label;
