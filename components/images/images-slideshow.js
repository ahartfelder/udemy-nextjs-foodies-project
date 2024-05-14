"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./images-slideshow.module.css";

import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";

const images = [
  { src: burgerImg, alt: "A burger" },
  { src: curryImg, alt: "A curry" },
  { src: dumplingsImg, alt: "Dumplings" },
  { src: macncheeseImg, alt: "Mac and cheese" },
  { src: pizzaImg, alt: "A pizza" },
  { src: schnitzelImg, alt: "A schnitzel" },
  { src: tomatoSaladImg, alt: "A tomato salad" },
];

export default function ImagesSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <Image
          className={index === currentImageIndex ? styles.active : ""}
          key={index}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
