/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
// import
import Meta from "../../../components/Meta";

const index = ({ article }) => {
  //   const router = useRouter();
  return (
    <div>
      <Meta title={article.title} description={article.excerpt} />
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go Back</Link>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: false,
  };
};
export default index;
