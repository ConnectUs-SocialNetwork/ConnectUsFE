import React, { useEffect, useState } from "react";
import classes from "../../styles/Comments/CommentText.module.css";

interface CommentTextProps {
  text: string;
}

const CommentText: React.FC<CommentTextProps> = ({ text }) => {
  const [showMore, setShowMore] = useState(true);
  const [more, setMore] = useState(false);

  const stringSaViseRedova = text.replace(/(.{55})/g, "$1\n");
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
        <p className={classes.p}>
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
        <p className={classes.p}>
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

export default CommentText;
