export default function ReviewsSection({ reviews = [] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="mx-[calc(2rem+2vw)] md:mx-[calc(2rem+3vw)] pb-14 px-6 mt-20 text-siva-100">
      <h2 className="text-3xl uppercase tracking-wide mb-6">
        Featured Reviews
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        {reviews.slice(0, 2).map((r) => (
          <article key={r.id} className="bg-siva-800/50 p-6 rounded-lg ">
            <h3 className="text-siva-300 font-normal mb-1 text-2xl italic">
              {r.author}
            </h3>
            <p className="text-siva-100 text-lg font-light leading-relaxed line-clamp-[12]">
              {r.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
