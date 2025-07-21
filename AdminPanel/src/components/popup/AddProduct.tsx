import React, { useRef, useEffect } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const AddProduct: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={overlayRef}
        className="bg-white rounded-[20px] shadow-lg w-full max-w-[500px] p-6 relative"
        style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)' }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <div className="space-y-4">
          {/* Image Upload Section */}
          <div 
            className="border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="text-gray-600 mt-2 text-sm">Выберите изображение</span>
          </div>

          {/* Form Section */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Категории</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                    <option>Каркасные</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Рамка</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Статус</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                    <option>Рекомендуем</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Комплектация</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md text-sm h-20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Количество</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Стартовая цена (сум)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Размер (м)</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Комплектация на узбекском</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md text-sm h-20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Цена со скидкой (сум)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Глубина(см)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Full width field */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Рамка на узбекском</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Add Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 text-sm font-medium mt-4"
            >
              Добавить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
