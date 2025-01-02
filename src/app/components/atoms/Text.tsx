interface TextProps {
  text: string; // Use `string`, not `String`
  className?: string;
  gradient?: string;
  onClick?: () => void;
}

const Text: React.FC<TextProps> = ({ text, className, gradient, onClick }) => {
  const gradientClass = gradient ? `bg-clip-text text-transparent ${gradient}` : "";
  return (
    <p
      className={`${className} ${gradientClass}`}
      onClick={onClick}
    >
      {text}
    </p>
  );
};

export default Text;
