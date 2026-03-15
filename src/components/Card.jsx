function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-4 md:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;