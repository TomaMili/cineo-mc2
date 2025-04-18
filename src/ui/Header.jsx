import Navigation from "./Navigation";

function Header({ isNavActive, setIsNavActive }) {
  return (
    <header className="h-24! bg-red-500! w-full">
      <button onClick={() => setIsNavActive(true)}>nav</button>
      <Navigation isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
    </header>
  );
}

export default Header;
