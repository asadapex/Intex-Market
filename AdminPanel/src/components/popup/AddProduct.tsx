import React, { useRef, useEffect, useState } from 'react';
import uploadimg from '../../assets/images/upload.svg'
import categoryicon from '../../assets/images/category.svg'
import priceimg from '../../assets/images/price.svg'
import frameimg from '../../assets/images/frame.svg'
import sizeimg from '../../assets/images/size.svg'
import recomimg from '../../assets/images/recom.svg'
import countimg from '../../assets/images/count.svg'
import { useCategory } from '../../service/UseCategory';
import { useProduct } from '../../service/UseProduct';
import { useImgUpload } from '../../service/UseImgUpload';
import toast from 'react-hot-toast';
import type { Product } from '../productWrapper/ProductWrapper';

interface Category {
  id: string;
  name_uz: string;
  name_ru: string;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  editProduct?: Product | null;
  children?: React.ReactNode;
}

const AddProduct: React.FC<PopupProps> = ({ isOpen, onClose, editProduct }) => {
  const { getCategory } = useCategory()
  const { data } = getCategory()
  const category: Category[] = data?.data || []

  const [uploadedImageName, setUploadedImageName] = useState<string>('');
  const [_, setImageFile] = useState<File | null>(null);
  const [img, setImg] = useState<string>('');
  const [category_id, setCategory_id] = useState<string>(`${category[0]?.id}`);
  const [price, setPrice] = useState<string>("");
  const [discountedPrice, setDiscountedPrice] = useState<string>("");
  const [frame_uz, setFrame_uz] = useState<string>("");
  const [frame_ru, setFrame_ru] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [status, setStatus] = useState<string>("Рекомендуем"); 
  const [count, setCount] = useState<string>("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);


  const { postProduct, updateProduct } = useProduct()
  const { mutate: createProduct } = postProduct()

  const updateProductHook = updateProduct(editProduct?.id || '')
  const { mutate: editProductMutation } = updateProductHook

  const { imgUpload } = useImgUpload()
  const { mutate: uploadImageFile } = imgUpload()

  const isEditMode = !!editProduct;

  useEffect(() => {
    if (isEditMode && editProduct) {
      setUploadedImageName(editProduct.image || '');
      setCategory_id(editProduct.categoryId || '');
      setPrice(editProduct.price?.toString() || '');
      setDiscountedPrice(editProduct.discountedPrice?.toString() || '');
      setFrame_uz(editProduct.frame_uz || '');
      setFrame_ru(editProduct.frame_ru || '');
      setSize(editProduct.size || '');
      setDepth(editProduct.depth?.toString() || '');
      setStatus(editProduct.status || '');
      setCount(editProduct.count?.toString() || '');

      if (editProduct.image) {
        setPreview(`http://3.87.71.145/file/${editProduct.image}`);
      }
    } else {
      resetForm();
    }
  }, [isEditMode, editProduct, isOpen]);

  useEffect(() => {
    if (category.length > 0 && !category_id && !isEditMode) {
      setCategory_id(category[0].id.toString());
    }
  }, [category, isEditMode]);

  const resetForm = () => {
    setUploadedImageName('');
    setImg('');
    setCategory_id(`${category[0]?.id}`);
    setPrice('');
    setDiscountedPrice('');
    setFrame_uz('');
    setFrame_ru('');
    setSize('');
    setDepth('');
    setStatus('Рекомендуем');
    setCount('');
    setPreview(null);
    setImageFile(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      uploadImageToServer(file);
    }
  };

  const uploadImageToServer = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    uploadImageFile(formData, {
      onSuccess: (response) => {
        
        setUploadedImageName(response?.filename);
      },
      onError: () => {
        
        alert(`Rasm yuklashda xatolik yuz berdi!`);
        setImageFile(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    });
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      image: uploadedImageName || (editProduct?.image || ''),
      categoryId: category_id,
      price: Number(price),
      discountedPrice: Number(discountedPrice),
      frame_uz,
      frame_ru,
      size,
      depth: Number(depth),
      status: status,
      count: Number(count),
      tools_ru: [
        "АрматураПодключения"
      ],
      tools_uz: [
        "UlashArmaturasi"
      ]
    };

    if (isEditMode) {
      editProductMutation(productData, {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          resetForm();
          onClose();
        },
        onError: () => {
          toast.error("Failed to update product.");
        }
      });
    } else {
      createProduct(productData, {
        onSuccess: () => {
          toast.success("Product created successfully!");
          resetForm();
          onClose();
        },
        onError: () => {
          toast.error("Failed to create product.");
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[5px] flex items-center justify-center p-4 z-50">
      <div
        ref={overlayRef}
        className="bg-[#F8F8F8] rounded-[30px] shadow-lg w-full max-w-[900px] pt-10 pb-7 px-16 relative"
        style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)' }}
      >
        <button
          className="absolute top-3 right-4 text-[#B9B9B9] hover:text-gray-700 text-3xl hover:scale-110 transition duration-300 ease-in-out"
          onClick={onClose}
        >
          ×
        </button>

        <div className="space-y-4">
          <div
            className="w-[500px] h-[250px] place-self-center bg-white border-dashed border-1 border-[#545454] rounded-[20px] flex items-center justify-center cursor-pointer gap-5"
            onClick={handleImageClick}
          >
            <input
              value={img}
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-contain rounded-[20px]" />
            ) : (
              <>
                <img src={uploadimg} alt="upload" className="h-9 w-9 text-[#898989]" />
                <span className="text-[#898989] text-[20px] font-medium">Select an image</span>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-14">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Category</label>
                  <div className="flex gap-[10px]">
                    <img src={categoryicon} alt="category" className="h-5 w-5" />
                    <select value={category_id} onChange={(e) => setCategory_id(e.target.value)} className="w-full py-1 text-[18px] border-b-1 border-b-[#545454] outline-none">
                      {category.map((category) => (
                        <option key={category.id} value={category.id}>{category.name_uz}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Starting Price (UZS)</label>
                  <div className="flex gap-[10px]">
                    <img src={priceimg} alt="price" className="h-6 w-6" />
                    <input
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      className="w-full py-1 text-[18px] border-b-1 border-b-[#545454] outline-none bg-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Frame</label>
                  <div className="flex gap-[10px]">
                    <img src={frameimg} alt="frame" className="h-5 w-5" />
                    <input
                      required
                      value={frame_ru}
                      onChange={(e) => setFrame_ru(e.target.value)}
                      type="text"
                      className="w-full  text-[18px] py-1 border-b-1 border-b-[#545454] outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Size (m)</label>
                  <div className="flex gap-[10px]">
                    <img src={sizeimg} alt="size" className="h-5 w-5" />
                    <input
                      required
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      type="text"
                      className="w-full py-1 text-[18px] border-b-1 border-b-[#545454] outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Status</label>
                  <div className="flex gap-[10px]">
                    <img src={recomimg} alt="status" className="h-5 w-5" />
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full text-[18px] py-1 border-b-1 border-b-[#545454] outline-none">
                      <option value={"Рекомендуем"}>Рекомендуем</option>
                      <option value={"Нет_в_наличии"}>Нет_в_наличии</option>
                      <option value={"Cкидка"}>Cкидка</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Quantity</label>
                  <div className="flex gap-[10px]">
                    <img src={countimg} alt="quantity" className="h-5 w-5" />
                    <input
                      required
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      type="number"
                      className="w-full text-[18px] py-1 border-b-1 border-b-[#545454] outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Discounted Price (UZS)</label>
                  <div className="flex gap-[10px]">
                    <img src={priceimg} alt="discount" className="h-6 w-6" />
                    <input
                      required
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      type="number"
                      className="w-full text-[18px] py-1 border-b-1 border-b-[#545454] outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Frame in Uzbek</label>
                  <div className="flex gap-[10px]">
                    <img src={frameimg} alt="frameuz" className="h-5 w-5" />
                    <input
                      required
                      value={frame_uz}
                      onChange={(e) => setFrame_uz(e.target.value)}
                      type="text"
                      className="w-full text-[18px] py-1 border-b-1 border-b-[#545454] outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-md text-[#898989] mb-1 ml-[30px]">Depth (cm)</label>
                  <div className="flex gap-[10px]">
                    <img src={sizeimg} alt="depth" className="h-5 w-5" />
                    <input
                      required
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      type="number"
                      className="w-full text-[18px] py-1 border-b-1 border-b-[#545454] outline-none bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-[30px] bg-[#009398] cursor-pointer text-white py-[6px] px-14 rounded-[30px] hover:bg-[#009999] text-[18px] font-medium block place-self-center"
              style={{ boxShadow: "0px 4px 10px 0px #00000040" }}
            >
              {isEditMode ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;