import CastCarousel from "./CastCarousel";

function CastSection({ slides }) {
  return (
    <div className="mx-[calc(2rem+2vw)] md:mx-[calc(2rem+3vw)] pb-14 px-6">
      <h3 className="text-3xl mb-2">CAST</h3>
      <CastCarousel
        slides={slides}
        options={{ dragFree: true }}
        onActorClick={(person) => console.log("Clicked:", person)}
      />
    </div>
  );
}

export default CastSection;
