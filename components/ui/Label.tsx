const Label = ({ text, htmlFor }: { text: string; htmlFor?: string }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm text-gray-400 mb-1 block">
      {text}
    </label>
  );
};

export default Label;
