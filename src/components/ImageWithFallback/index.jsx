import { useEffect, useState } from "react";

export const ImageWithFallback = ({ src, fallbackSrc, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    const checkImage = async () => {
      const img = new Image();
      img.src = src;

      img.onload = () => setImageSrc(src);
      img.onerror = () => setImageSrc(fallbackSrc);

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    };

    checkImage();
  }, [src, fallbackSrc]);

  return <img src={imageSrc} alt={alt} className={className} />;
};
