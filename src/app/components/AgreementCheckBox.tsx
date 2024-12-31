interface AgreementCheckBoxProps {
  onChange: (checked: boolean) => void;
  error?: string;
}

const AgreementCheckBox: React.FC<AgreementCheckBoxProps> = ({ onChange, error }) => {
  return (
    <div className="relative">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
          className={`w-4 h-4 text-blue-600 bg-gray-100 border rounded focus:ring-blue-500 
          ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label className="ml-2 text-sm font-medium text-gray-900">
          I agree to the terms and conditions
        </label>
      </div>
    </div>
  );
};
export default AgreementCheckBox