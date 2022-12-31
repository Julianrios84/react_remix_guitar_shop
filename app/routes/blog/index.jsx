import { useLoaderData } from '@remix-run/react';
import ListPosts from '~/components/list-posts';
import { getPosts } from '~/models/posts';

export function meta() {
  return {
    title: 'GuitarLA - Our Blog',
    description: 'Guitar, Music blog and guitar sales'
  };
}

export async function loader() {
  const posts = await getPosts();
  return posts.data;
}

function Blog() {
  const posts = useLoaderData();
  return <ListPosts posts={posts} />;
}

export default Blog;
