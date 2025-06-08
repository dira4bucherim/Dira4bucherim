import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-96">
        <div className="bg-gray-200 rounded-2xl flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-96">
        {/* Main Image */}
        <div 
          className="cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={images[0]}
            alt={`${title} - Main view`}
            className="w-full h-full object-cover rounded-2xl hover:opacity-95 transition-opacity"
          />
        </div>
        
        {/* Grid of smaller images */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <div 
              key={index + 1}
              className="relative cursor-pointer"
              onClick={() => openLightbox(index + 1)}
            >
              <img 
                src={image}
                alt={`${title} - View ${index + 2}`}
                className="w-full h-full object-cover rounded-2xl hover:opacity-95 transition-opacity"
              />
              {/* Show count overlay on last image if there are more */}
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage !== null && (
            <div className="relative">
              <img 
                src={images[selectedImage]}
                alt={`${title} - View ${selectedImage + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Close button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-white/80"
                onClick={closeLightbox}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
