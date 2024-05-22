import React from "react";

import { CardMedia } from "./index.jsx";

import { UrlComponent } from "@/components/Util/Util";
import { TYPE_MEDIA } from "@/global/constants";

const regexUrl = /(?:www\.[^\s]+)|(?:https?:[^\s]+)/gi;

function replaceSpacesWithNbsp(text) {
  return text.replace(/ /g, "\u00A0");
}

function wrapUrlsWithAnchorTags(text) {
  const listMachUrl = text.match(regexUrl);

  if (!listMachUrl) {
    return text;
  }

  const textWithoutUrls = text.split(regexUrl);

  const lineFormatted = textWithoutUrls.map((textPart, index) => {
    const partUrl = listMachUrl[index];
    if (!partUrl) {
      return textPart;
    }

    return (
      <React.Fragment key={`cardNoteArrayUrl${index}`}>
        {textPart}
        <UrlComponent url={listMachUrl[index]} />
      </React.Fragment>
    );
  });

  return lineFormatted;
}

export const CardNote = ({ id, text, notifyDelete }) => {
  const textFormatted = replaceSpacesWithNbsp(text);

  const lines = textFormatted.split("\n");

  const textFormattedCard = lines.map((lineCurrent, index) => {
    const textAnchor = wrapUrlsWithAnchorTags(lineCurrent);

    return (
      <React.Fragment key={`cardNote${index}`}>
        {textAnchor}
        <br />
      </React.Fragment>
    );
  });

  return (
    <CardMedia id={id} notifyDelete={notifyDelete} typeMedia={TYPE_MEDIA.NOTE}>
      {textFormattedCard}
    </CardMedia>
  );
};
