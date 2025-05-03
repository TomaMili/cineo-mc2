export default function SettingsAvatar({
  src = "/profile-avatar.png",
  name = "Username",
}) {
  return (
    <div className="relative bg-siva-800 rounded-t-2xl px-8 pb-15 mx-auto mt-30">
      <img
        src={src}
        alt="avatar"
        className="w-68 h-68 rounded-full border-4 border-black object-cover mx-auto -mt-42"
      />
      <h3 className="mt-4 text-5xl font-normal text-center text-siva-100">
        {name}
      </h3>
    </div>
  );
}
