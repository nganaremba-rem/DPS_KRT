const DateInput = ({ name, field, id, required }) => {
  return (
    <div key={name} className="flex flex-col gap-2 ">
      <label className="text-gray-700 pl-2" htmlFor={name}>
        {field}
      </label>
      <input
        className="px-3 py-1 text-gray-600 border rounded"
        type={"datetime-local"}
        name={name}
        id={id}
        required={required}
      />
    </div>
  );
};

export default DateInput;
