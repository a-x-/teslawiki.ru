import fromEntries from "object.fromentries";
import flatMap from "array.prototype.flatmap";
import React from "react";
import Link from "next/link";
import { getPage } from "../lib/notion";
import Text from "../components/Text";

if (!Object.fromEntries) fromEntries.shim();
if (!Array.prototype.flatMap) flatMap.shim();

const pageId = process.env.NOTION_PAGE_ID;
export { pageId };

export default function Home({ posts }) {
  return (
    <ol>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </ol>
  );
}

function Post({ data }) {
  return (
    <li key={data.id}>
      <Link href={`/${data.id}`}>
        <Text value={data.properties.title?.title} />
      </Link>
    </li>
  );
}

const getStaticProps = async () => {
  const page = await getPage(pageId);

  return {
    props: {
      posts: [page],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
};
export { getStaticProps };
