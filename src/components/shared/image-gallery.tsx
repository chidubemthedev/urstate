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
  const [direction, setDirection] = useState(0); // Tracks slide direction

  // Safety check: if no images, return null
  if (!images || images.length === 0) return null;

  // --- Handlers ---
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    // Calculate new index wrapping around the array
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // --- Framer Motion Animation Variants ---
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
      {/* --- 1. THE GRID UI --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[400px]">
        {/* Main Large Image (Index 0) */}
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

        {/* Side Stacked Images (Index 1 and 2) */}
        {images.length > 1 && (
          <div className="hidden md:grid grid-rows-2 gap-4 h-full">
            {/* Top Right Image (Index 1) */}
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

            {/* Bottom Right Image (Index 2) */}
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

                {/* Conditionally render "View all photos" button */}
                {images.length > 3 && (
                  <Button
                    variant="secondary"
                    className="absolute bottom-4 right-4 gap-2 bg-white/95 hover:bg-white text-gray-900 rounded-lg shadow-md transition-all z-10"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent firing the image click
                      openLightbox(3); // Open starting at the 4th image
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
        {/* We use a custom overlay/content style to make it full screen and dark */}
        <DialogContent className="max-w-[100vw] h-[100dvh] p-0 border-none bg-black/95 m-0 rounded-none shadow-none flex flex-col justify-center overflow-hidden">
          {/* Accessible Title (Required by Radix/shadcn, visually hidden) */}
          <DialogTitle className="sr-only">Property Image Gallery</DialogTitle>

          {/* Top Bar (Counter and Close) */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 text-white">
            <span className="text-sm font-medium tracking-widest opacity-80">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Prev Button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 text-white hidden md:block"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image Slider Wrapper */}
          <div className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto px-4 md:px-16">
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
                // Mobile Drag/Swipe Configuration
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
                className="absolute inset-0 flex items-center justify-center p-4 md:p-12"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={images[currentIndex]}
                    alt={`Property view ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Next Button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 text-white hidden md:block"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
