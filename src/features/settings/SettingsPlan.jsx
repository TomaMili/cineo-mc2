export default function SettingsPlan() {
  return (
    <div className="max-w-3xl mx-auto rounded-lg p-6 text-white">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        {/* Free plan */}
        <div className="bg-black/80 flex-1 border rounded-lg p-6 space-y-4">
          <h3 className="text-2xl font-semibold">Free</h3>
          <p className="text-lg">0€ / month</p>
          <p>Casual watcher</p>
          <button className="bg-bordo-500 hover:bg-bordo-400 w-full py-2 rounded cursor-pointer">
            Select
          </button>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Personalized suggestions</li>
            <li>Watchlist</li>
            <li>Your movie DNA</li>
            <li>Up to 30 watched movies</li>
          </ul>
        </div>

        {/* Premium plan */}
        <div className="bg-black/80 flex-1 border rounded-lg p-6 space-y-4">
          <h3 className="text-2xl font-semibold">Premium</h3>
          <p className="text-lg">10€ / month</p>
          <p>Movie enjoyer</p>
          <button className="bg-bordo-500 hover:bg-bordo-400 w-full py-2 rounded cursor-pointer">
            Free trial
          </button>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Personalized suggestions</li>
            <li>Watchlist</li>
            <li>Your movie DNA</li>
            <li>Unlimited watched movies</li>
            <li>Watch together feature</li>
            <li>Synchronized with streaming platforms</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
