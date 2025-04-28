export default function useShare() {
  return (url = window.location.href, msg = "Link copied!") => {
    navigator.clipboard.writeText(url).then(() => {
      /* toast / alert */
      alert(msg);
    });
  };
}
