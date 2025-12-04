import Feature from "./Feature";

export default function UISneakPeekSection() {
  return (
    <Feature>
      <section className="py-24 mt-10 bg-gradient-to-b from-siva-800 via-black to-siva-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6">
              Here's what you'll get
            </h2>
            <p className="text-2xl text-siva-300 font-light">
              A sneak peek at the Cineo experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group my-5">
              <img
                src="/article-3.png"
                className="rounded-xl border border-bordo-500/20 group-hover:border-bordo-400/40 transition-all w-full "
                alt="Personal dashboard"
              />
              <div className="absolute -bottom-4 left-6 hover:scale-105 hover:bg-bordo-600 bg-bordo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-transform">
                Your personal dashboard
              </div>
            </div>

            <div className="relative group">
              <img
                src="/supepreporuka.png"
                className="rounded-xl border border-bordo-500/20 group-hover:border-bordo-400/40 transition-all w-full"
                alt="AI recommendations"
              />
              <div className="absolute -bottom-4 left-6 hover:scale-105 hover:bg-bordo-600 bg-bordo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                AI-powered recommendations
              </div>
            </div>
          </div>
        </div>
      </section>
    </Feature>
  );
}
