import React from "react";

export const LinkifyComponentDecorator: (
  decoratedHref: string,
  decoratedText: string,
  key: number
) => React.ReactNode = (decoratedHref, decoratedText, key) => {
  return (
    <a href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">
      {decoratedText}
    </a>
  );
};
