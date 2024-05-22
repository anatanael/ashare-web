import React from "react";

export const UrlComponent = ({ url }) => {
  if (!url) {
    return null;
  }

  const addHttp = !url.startsWith("http") ? "http://" : "";

  return (
    <a href={`${addHttp}${url}`} target="_blank" rel="noreferrer">
      {url}
    </a>
  );
};
