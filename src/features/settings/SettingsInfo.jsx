// src/features/settings/SettingsInfo.jsx

export default function SettingsInfo() {
  return (
    <div className="space-y-12">
      <div className="max-w-md mx-auto bg-black rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Info</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-white">Full Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-600 bg-gray-900"
            />
          </label>
          <label className="block">
            <span className="text-white">E-mail</span>
            <input
              type="email"
              className="mt-1 block w-full rounded border-gray-600 bg-gray-900"
            />
          </label>
          <label className="block">
            <span className="text-white">Username</span>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-600 bg-gray-900"
            />
          </label>
          <button className="w-full bg-bordo-500 hover:bg-red-700 py-2 rounded mt-4 cursor-pointer">
            Edit
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-black rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Change your password
        </h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-white">Current password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded border-gray-600 bg-gray-900"
            />
          </label>
          <label className="block">
            <span className="text-white">New password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded border-gray-600 bg-gray-900 "
            />
          </label>
          <label className="block">
            <span className="text-white">Confirm password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded border-gray-600 bg-gray-900"
            />
          </label>
          <button className="w-full bg-bordo-500 hover:bg-red-700 py-2 rounded mt-4 cursor-pointer">
            Change password
          </button>
        </div>
      </div>
    </div>
  );
}
