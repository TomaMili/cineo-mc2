import Feature from "./Feature";

export default function PricingSection() {
  return (
    <Feature>
      <section className="pb-10 h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl lg:text-6xl font-medium text-white text-center mb-22">
            Pricing plans
          </h2>
          <div className="grid grid-cols-1 px-4 lg:grid-cols-2 gap-10 lg:gap-30">
            <div className="bg-bordo-700/90 rounded-xl p-8 flex flex-col py-18 transition-all duration-500 hover:scale-105 relative">
              <img
                src="/doodle-1.png"
                alt="doodle"
                className="absolute w-20 lg:w-40 rotate-270 -top-12 -left-8 lg:-top-20 lg:-left-20"
              />
              <h3 className="text-3xl lg:text-5xl font-medium text-white mb-2">
                Free
              </h3>
              <p className="text-lg lg:text-2xl text-white mb-6">
                <span className="font-medium">0 € </span>
                <span className="text-gray-400">/ month</span>
              </p>
              <ul className="space-y-2 lg:space-y-4 mb-auto text-lg lg:text-2xl font-light">
                <li className="text-gray-300">
                  Save up to
                  <span className="font-medium text-white"> 30 movies</span>
                </li>
                <li className="text-gray-300">Basic recommendations</li>
                <li className="text-gray-300">SuperSuggest integration</li>
              </ul>
            </div>

            <div className="bg-bordo-500/30 rounded-xl p-8 flex flex-col py-18 transition-all relative duration-500 hover:scale-105">
              <img
                src="/doodle-2.png"
                alt="doodle"
                className="absolute w-10 lg:w-30 rotate-270 lg:-bottom-20 lg:-right-30 -bottom-8 -right-9"
              />
              <h3 className="text-3xl lg:text-5xl font-medium text-white mb-2">
                Premium
              </h3>
              <p className="text-lg lg:text-2xl text-white mb-6">
                <span className="font-medium">5 € </span>
                <span className="text-gray-400">/ month</span>
              </p>
              <ul className="space-y-2 lg:space-y-4 mb-auto text-lg lg:text-2xl font-light">
                <li className="text-gray-300">
                  <span className="font-medium text-white">Unlimited</span>{" "}
                  saved movies
                </li>
                <li className="text-gray-300">Advanced AI recommendations</li>
                <li className="text-gray-300">Watch-together features</li>
                <li className="text-gray-300">Integrated streaming services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Feature>
  );
}
