import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

// Sanity
import { sanityClient, urlFor } from "../sanity";

// Components
import Header from "../components/Header";
import Hero from "../components/Hero";

// Typings
import { Post } from "../typings";

// TS Interfaces
interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium blog</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <Hero />

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()}
                alt="Post Image"
              />
              <div className="flex  justify-between p-5 bg-white">
                <div className="w-[80%]">
                  <p className="text-lg font-bold">{post.title}</p>
                  <p>
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-14 w-14 rounded-full self-center"
                  src={urlFor(post.author.image).url()}
                  alt="Author Image"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

// // SSR
export const getServerSideProps = async () => {
  // Fetching query from sanity
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
    description,
    mainImage,
   slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
