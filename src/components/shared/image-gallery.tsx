"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <>
      {/* --- 1. THE GRID UI (Unchanged) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[400px]">
        <div
          className="md:col-span-2 relative h-full cursor-pointer group overflow-hidden rounded-xl"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={images[0]}
            alt="Property main view"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-w-1024px) 100vw, 800px"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {images.length > 1 && (
          <div className="hidden md:grid grid-rows-2 gap-4 h-full">
            <div
              className="relative h-full cursor-pointer group overflow-hidden rounded-xl"
              onClick={() => openLightbox(1)}
            >
              <Image
                src={images[1]}
                alt="Property view 2"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            {images.length > 2 && (
              <div
                className="relative h-full cursor-pointer group overflow-hidden rounded-xl"
                onClick={() => openLightbox(2)}
              >
                <Image
                  src={images[2]}
                  alt="Property view 3"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {images.length > 3 && (
                  <Button
                    variant="secondary"
                    className="absolute bottom-4 right-4 gap-2 bg-white/95 hover:bg-white text-gray-900 rounded-lg shadow-md z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(3);
                    }}
                  >
                    <ImageIcon className="w-4 h-4" />
                    View all {images.length} photos
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- 2. THE LIGHTBOX MODAL --- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl min-w-[95vw] h-[90vh] bg-transparent border-none shadow-none flex items-center justify-center p-0">
          <DialogTitle className="sr-only">Property Image Gallery</DialogTitle>

          {/* Top Info Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50">
            <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white rounded-full text-sm font-medium tracking-widest">
              {currentIndex + 1} / {images.length}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prev Button (Desktop) */}
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors z-50 text-white hidden md:block"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image Slider */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                // ✅ FIX: Allow horizontal drag with spring-back to center
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                // touch-pan-y allows the user to scroll the page vertically without triggering the horizontal slider drag
                className="absolute inset-0 flex items-center justify-center touch-pan-y"
              >
                {/* ✅ FIX: The relative container now perfectly scales to the 90vh parent, 
                  and Next.js Image maintains the aspect ratio with object-contain. 
                */}
                <div className="relative w-full h-full md:w-[85%] md:h-[95%]">
                  <Image
                    src={images[currentIndex]}
                    alt={`Property view ${currentIndex + 1}`}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-w-1024px) 100vw, 1200px"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button (Desktop) */}
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors z-50 text-white hidden md:block"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
