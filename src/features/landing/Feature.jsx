/* eslint-disable no-unused-vars */

// iOS Safari Fix: Removed IntersectionObserver and animations - render immediately
export default function Feature({ children, background }) {
  return <div className={`bg-[url(${background})]`}>{children}</div>;
}
