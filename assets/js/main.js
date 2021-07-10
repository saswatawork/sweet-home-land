const baseUrl =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "./../../"
    : "https://github.com/saswatawork/sweet-home-land";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${baseUrl}/serviceWorker.js`)
      .then(() => console.log("Service worker Registered"))
      .catch((err) => console.warn(`Service worker error: ${err}`));
  });
}
