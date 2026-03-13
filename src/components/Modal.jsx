function Modal({ open, onClose, children }) {

if (!open) return null;

return (
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/40"
    onClick={onClose}
  />
  {/* Conteúdo */}
  <div
    className="
      relative
      bg-white
      rounded-xl
      shadow-lg
      w-full
      max-w-md
      p-6
    "
  >
    {children}
    <div className="mt-6 flex justify-end">
      <button
        onClick={onClose}
        className="
          px-4
          py-2
          text-sm
          font-medium
          rounded-lg
          bg-gray-100
          hover:bg-gray-200
          transition
        "
      >
        Fechar
      </button>
    </div>
  </div>
</div>
);
}

export default Modal;