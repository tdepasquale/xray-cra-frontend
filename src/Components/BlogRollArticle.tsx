import React, { useRef, useEffect, useState, useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import IBlogRollArticle from "../models/IBlogRollArticle";
import { Link } from "react-router-dom";
import { UtilityContext } from "../App";
import { setCardHeightAction } from "../contexts/UtilityContext";

interface IProps {
  article: IBlogRollArticle;
}

export const BlogRollArticle: React.FC<IProps> = ({ article }) => {
  const utilityContext = useContext(UtilityContext);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardHeight] = useState(utilityContext?.utilityData.cardHeight);

  useEffect(() => {
    function handleResize() {
      let currentHeight = cardRef.current ? cardRef!.current!.offsetWidth : 0;
      if (currentHeight !== cardHeight)
        utilityContext?.utilityDispatch(setCardHeightAction(currentHeight));
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [utilityContext, cardHeight]);

  let titleNoSpecial = article.title.replace(/[^\w\s]/gi, "");
  const titleNoSpace = titleNoSpecial.replace(/\s+/g, "-");

  return (
    <Card
      color="blue"
      as={Link}
      to={`/blog/${titleNoSpace}/${article.id}`}
      style={{
        height: `${cardHeight}px`,
      }}
    >
      <div ref={cardRef}></div>
      <Image
        src={article.image}
        wrapped
        ui={false}
        style={{
          height: `${cardHeight}px`,
        }}
      />
      <Card.Content className="blog-card-content">
        <Card.Header className="blog-card-text">{article.title}</Card.Header>
      </Card.Content>
    </Card>
  );
};
