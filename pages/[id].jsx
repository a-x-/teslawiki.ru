import fromEntries from "object.fromentries";
import flatMap from "array.prototype.flatmap";
import React from "react";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";

// import "prismjs/themes/prism-tomorrow.css";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";

if (!Object.fromEntries) fromEntries.shim();
if (!Array.prototype.flatMap) flatMap.shim();

export async function getStaticProps(context) {
  const notion = new NotionAPI();
  const { id } = context.params;

  const recordMap = await notion.getPage(id);

  // const data = await fetch(`https://notion-api.splitbee.io/v1/page/${id}`).then((res) => res.json());

  return {
    props: {
      recordMap: recordMap,
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: ["eeac0f6a96fd426cae7e3b68032077e0"].map((id) => ({ params: { id } })),
    fallback: true,
  };
};

export default function NotionPage({ recordMap }) {
  return (
    <div style={{ maxWidth: 768 }}>
      <NotionRenderer fullPage recordMap={recordMap} />
    </div>
  );
}
