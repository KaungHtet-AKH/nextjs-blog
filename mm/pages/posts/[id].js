import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

// Add this line to imports
import Date from "../../components/date";

// Add this line
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
  // အပေါ် export က React Component
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
  // Fetch necessary data for the blog post using params.id
}
