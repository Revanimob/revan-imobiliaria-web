import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageZoomModalProps {
  image: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageZoomModal = ({ image, isOpen, onClose }: ImageZoomModalProps) => {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-5xl p-2 bg-black flex items-center justify-center 
                   sm:p-4 md:p-6 rounded-xl"
      >
        <div className="w-full flex justify-center items-center">
          <img
            src={image}
            alt="Imagem ampliada"
            className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain 
                       rounded-lg transition-transform duration-300 ease-in-out 
                       hover:scale-105 cursor-zoom-in"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoomModal;
