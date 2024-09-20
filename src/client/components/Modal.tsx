import { PropsWithChildren, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  width?: string;
}

const Modal = ({ isOpen, onClose, title, children, width = '500px' }: PropsWithChildren<ModalProps>) => {

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body?.setAttribute("style", "overflow: hidden");
      return;
    }
    body?.setAttribute("style", "");
  }, [isOpen])

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    // Přidání event listeneru při mountu komponenty
    document.addEventListener('keydown', handleKeyPress);

    // Odebrání event listeneru při unmountu komponenty
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-500 overflow-auto bg-black bg-opacity-50 flex items-center justify-center translate-x-[150px]">
      <div className={`bg-white dark:bg-slate-700 rounded-lg shadow-xl mx-auto w-[${width}]`}>
        
        <div className="border-b px-4 py-2 flex items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-black close-modal">
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
