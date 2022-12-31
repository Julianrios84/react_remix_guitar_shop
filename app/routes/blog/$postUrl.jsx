import { useLoaderData } from '@remix-run/react';
import { getPost } from '~/models/posts';
import { formatterDate } from '~/utils/helpers';

export function meta({ data }) {
  if (!data) {
    return {
      title: 'Guitars - Entry not found',
      description: `Guitars, guitars for sale, entry not found`
    };
  }
  return {
    title: `GuiGuitarstarLA - ${data?.data[0]?.attributes.titulo}`,
    description: `Guitars, guitar sale, entrance ${data.data[0].attributes.titulo}`
  };
}

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await getPost(postUrl);
  if (post.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Entry not found'
    });
  }
  return post;
}

export default function Post() {
  const post = useLoaderData();
  const { title, content, image, publishedAt } = post?.data[0]?.attributes;
  return (
    <article className={`${styles.post} ${styles['mt-3']}`}>
      <img
        className="image"
        src={image?.data?.attributes?.url}
        alt={`imagen blog ${title}`}
      />
      <div className="content">
        <h3>{title}</h3>
        <p className="date">{formatterDate(publishedAt)}</p>
        <p className="text">{content}</p>
      </div>
    </article>
  );
}
