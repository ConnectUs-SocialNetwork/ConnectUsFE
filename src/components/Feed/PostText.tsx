import React, { useEffect, useState } from "react";
import classes from "../../styles/Feed/PostText.module.css"; // Pravilno putanja do CSS modula

interface PostTextProps {
  text: string;
}

const PostText: React.FC<PostTextProps> = ({ text }) => {
  const [showMore, setShowMore] = useState(true);
  const [more, setMore] = useState(false);

  const stringSaViseRedova = text.replace(/(.{72})/g, "$1\n");
  const rows = stringSaViseRedova.split("\n");

  useEffect(() => {
    if (rows.length <= 2) {
        setShowMore(false);
      }
  }, [showMore])

  const firstTwoRows = rows.slice(0, 2);
  const result = firstTwoRows.join("\n");

  return (
    <div className={classes.textContainer}>
      {showMore && !more && (
        <p>
          {result}
          <label
            onClick={() => {
              setMore(true);
            }}
            className={classes.label}
          >
            ...show more
          </label>
        </p>
      )}
      {showMore && more && (
        <p>
          {stringSaViseRedova}
          <label
            className={classes.label}
            onClick={() => {
              setMore(false);
            }}
          >
            ...show less
          </label>
        </p>
      )}
      {!showMore && <p>{result}</p>}
    </div>
  );
};

export default PostText;
