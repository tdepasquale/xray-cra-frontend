import React from "react";
import { Container, Image } from "semantic-ui-react";

interface IProps {
  id: string;
  text: string;
  imageURL?: string;
  imageSrc?: string;
}

export const BlogImage: React.FC<IProps> = ({
  id,
  text,
  imageURL,
  imageSrc,
}) => {
  if (imageSrc === undefined) imageSrc = `${process.env.PUBLIC_URL}${imageURL}`;

  return (
    <Container key={id} text textAlign="center" className="blog">
      {typeof imageSrc === "string" ? (
        <Image
          src={imageSrc}
          centered
          className="blog-image-preview margin-all-1"
        />
      ) : null}
      <small>{text}</small>
    </Container>
  );
};
