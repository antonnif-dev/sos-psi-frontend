export default function Card({ children }) {

  return (
    <div className="
      bg-white
      rounded-xl
      shadow-sm
      border
      p-4
      md:p-6
    ">
      {children}
    </div>
  );

}