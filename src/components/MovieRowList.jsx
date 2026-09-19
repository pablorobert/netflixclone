import MovieRow from './MovieRow.jsx';

const MovieRowList = ({ sections }) => (
  <section className="lists">
    {sections.map((section) => (
      <MovieRow key={section.slug} title={section.title} items={section.items} />
    ))}
  </section>
);

export default MovieRowList;
