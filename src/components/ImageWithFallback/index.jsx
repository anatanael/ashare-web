import { useEffect, useState } from "react";

export const ImageWithFallback = ({ src, fallbackSrc, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    const checkImage = async () => {
      try {
        if (!src) {
          throw new Error("Image Not Found");
        }

        const response = await fetch(src, { method: "HEAD" });

        if (response.redirected || response.status === 302) {
          setImageSrc(fallbackSrc);

          return;
        }

        setImageSrc(src);
      } catch (error) {
        setImageSrc(fallbackSrc);
      }
    };

    checkImage();
  }, [src, fallbackSrc]);

  return <img src={imageSrc} alt={alt} className={className} />;
};
