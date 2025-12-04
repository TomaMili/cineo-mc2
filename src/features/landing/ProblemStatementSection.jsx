import { Icon } from "@iconify-icon/react";
import Feature from "./Feature";
import CardSwap, { Card } from "../../components/CardSwap";

export default function ProblemStatementSection() {
  return (
    <Feature>
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-siva-800 via-siva-900/50 to-siva-800 overflow-hidden relative">
        {/* Red blurred circles ambient lighting */}
        <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-bordo-500/30 rounded-full blur-[100px] md:blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-bordo-500/20 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[200px] md:w-[350px] h-[200px] md:h-[350px] bg-bordo-500/15 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 md:mb-6 leading-tight">
                The average person spends{" "}
                <span className="text-bordo-400">110+ hours per year</span> just
                scrolling
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-siva-300 font-light">
                Sound familiar?
              </p>
            </div>

            {/* Right side - CardSwap with pain points */}
            <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[500px] mt-5 whitespace-pre-line">
              <div className="w-full flex justify-center items-center">
                <div className="scale-[0.64] sm:scale-75 md:scale-90 lg:scale-100 mx-auto">
                  <CardSwap
                    width={500}
                    height={320}
                    cardDistance={60}
                    verticalDistance={70}
                    delay={5000}
                    pauseOnHover={false}
                    easing="elastic"
                  >
                    <Card className="bg-gradient-to-b from-siva-900 via-black to-bordo-600 shadow-[0_0_20px_rgba(185,28,28,0.2)]">
                      <div className="px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 h-full flex flex-col">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 pb-3 sm:pb-4 md:pb-5 lg:pb-6 border-b border-white -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 px-5 sm:px-6 md:px-8 lg:px-10">
                          <Icon
                            icon="mdi:timer-sand"
                            className="text-white mb-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                          />
                          <h3 className="text-3xl font-bold text-white leading-tight">
                            Endless scrolling
                          </h3>
                        </div>
                        <p className="text-white font-light text-2xl mt-4 sm:mt-5 md:mt-5 lg:mt-6 leading-snug sm:leading-normal md:leading-relaxed">
                          Netflix, HBO, Disney+... which one has that movie
                          again? <br /> Spending hours browsing through
                          platforms instead of watching.
                        </p>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-b from-siva-900 via-black to-bordo-600 shadow-[0_0_20px_rgba(185,28,28,0.2)]">
                      <div className="px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 h-full flex flex-col">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 pb-3 sm:pb-4 md:pb-5 lg:pb-6 border-b border-white -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 px-5 sm:px-6 md:px-8 lg:px-10">
                          <Icon
                            icon="mdi:account-group"
                            className="text-white mb-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                          />
                          <h3 className="text-3xl font-bold text-white leading-tight">
                            Group indecision
                          </h3>
                        </div>
                        <p className="text-white font-light text-2xl mt-4 sm:mt-5 md:mt-5 lg:mt-6 leading-snug sm:leading-normal md:leading-relaxed">
                          30 minutes debating what to watch with friends. <br />
                          Everyone has different tastes and nobody can decide.
                        </p>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-b from-siva-900 via-black to-bordo-600 shadow-[0_0_20px_rgba(185,28,28,0.2)]">
                      <div className="px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 h-full flex flex-col">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 pb-3 sm:pb-4 md:pb-5 lg:pb-6 border-b border-white -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 px-5 sm:px-6 md:px-8 lg:px-10">
                          <Icon
                            icon="mdi:library-shelves"
                            className="text-white mb-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                          />
                          <h3 className="text-3xl font-bold text-white leading-tight">
                            Lost watchlists
                          </h3>
                        </div>
                        <p className="text-white font-light text-2xl mt-4 sm:mt-5 md:mt-5 lg:mt-6 leading-snug sm:leading-normal md:leading-relaxed">
                          Notes app, screenshots, browser tabs... chaos
                          everywhere. <br />
                          Your movie collection is scattered and unorganized.
                        </p>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-b from-black via-black to-bordo-600 shadow-[0_0_20px_rgba(185,28,28,0.2)]">
                      <div className="px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 h-full flex flex-col">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 pb-3 sm:pb-4 md:pb-5 lg:pb-6 border-b border-white -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 px-5 sm:px-6 md:px-8 lg:px-10">
                          <Icon
                            icon="mdi:star-off"
                            className="text-white mb-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                          />
                          <h3 className="text-3xl font-bold text-white leading-tight">
                            Generic recommendations
                          </h3>
                        </div>
                        <p className="text-white font-light text-2xl mt-4 sm:mt-5 md:mt-5 lg:mt-6 leading-snug sm:leading-normal md:leading-relaxed">
                          Algorithms that don't really know your taste. <br />
                          The same suggestions over and over again.
                        </p>
                      </div>
                    </Card>
                  </CardSwap>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Feature>
  );
}
