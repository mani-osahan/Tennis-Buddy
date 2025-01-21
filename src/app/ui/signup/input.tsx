export default function Input(props: {
  type: string;
  name: string;
  value: string;
  required: boolean;
  placeholder: string;
  onChange: any;
  onClick?: any;
}) {
  return (
    <div className="max-w-md w-full">
      <div className=" rounded-lg overflow-hidden">
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          required={props.required}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className="w-full p-2 text-black text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
