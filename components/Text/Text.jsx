import React from "react";
import styles from "./styles.module.css";

export default function Text({ value }) {
  if (!value) return null;
  console.log("text value", value);
  return value.map(({ annotations: { bold, code, color, italic, strikethrough, underline }, text }, i) => {
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : undefined}
        key={i}
      >
        {text?.link ? <a href={text.link.url}>{text.content}</a> : text?.content}
      </span>
    );
  });
}
