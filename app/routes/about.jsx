import imagen from '../../public/img/nosotros.jpg';
import styles from '~/styles/about.css';

export function meta() {
  return {
    title: 'GuitarLA - About',
    description: 'Guitar sales, music blog'
  };
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ];
}

function About() {
  return (
    <main className="container about">
      <h2 className="heading">About</h2>

      <div className="content">
        <img src={imagen} alt="image about us" />

        <div>
          <p>
            Etiam accumsan est et feugiat dictum. Praesent urna purus, finibus
            vitae maximus id, gravida a erat. Vivamus aliquet dapibus odio id
            tincidunt. Quisque commodo lacinia lorem, nec suscipit ligula mollis
            nec. In pulvinar purus maximus elit sodales feugiat. Sed id turpis
            risus. Suspendisse neque tortor, tincidunt porttitor risus non,
            ultrices vehicula eros.
          </p>

          <p>
            Etiam accumsan est et feugiat dictum. Praesent urna purus, finibus
            vitae maximus id, gravida a erat. Vivamus aliquet dapibus odio id
            tincidunt. Quisque commodo lacinia lorem, nec suscipit ligula mollis
            nec. In pulvinar purus maximus elit sodales feugiat. Sed id turpis
            risus. Suspendisse neque tortor, tincidunt porttitor risus non,
            ultrices vehicula eros.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
