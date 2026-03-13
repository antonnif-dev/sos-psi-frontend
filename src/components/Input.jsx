function Input({ label, ...props }) {

return (
<div className="flex flex-col gap-1.5 w-full">
  {label && (
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
  )}
  <input
    className="
      w-full
      border border-gray-300
      rounded-lg
      px-3
      py-2
      text-sm
      bg-white
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-500
      focus:border-indigo-500
      transition
    "
    {...props}
  />
</div>
);
}
export default Input;