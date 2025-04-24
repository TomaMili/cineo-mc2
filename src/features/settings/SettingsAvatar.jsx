// SettingsAvatar.jsx
export default function SettingsAvatar({
  src = "/profile-avatar.png",
  name = "Username",
}) {
  return (
    <div className="relative bg-siva-800 rounded-2xl px-8 pb-15 mx-auto">
      <img
        src={src}
        alt="avatar"
        className="w-68 h-68 rounded-full border-4 border-black object-cover mx-auto -mt-24"
      />
      <h3 className="mt-4 text-5xl font-semibold text-center text-white">
        {name}
      </h3>
      <label className="block text-center mt-15 ">
        <button className="  bg-bordo-500 hover:bg-bordo-400 text-white px-4 py-2 rounded cursor-pointer">
          Change photo
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => {
            /*…*/
          }}
        />
      </label>
    </div>
  );
}
