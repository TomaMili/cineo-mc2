function SkeletonPoster({ w = 192, h = 288 }) {
  return (
    <div
      style={{ width: w, height: h }}
      className="animate-pulse rounded-lg bg-siva-300/30"
    />
  );
}

export default SkeletonPoster;
