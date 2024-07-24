import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

const echo = new Echo({
  broadcaster: "pusher",
  key: "89d9a354e95472191a14", // use your PUSHER_APP_KEY from .env
  cluster: "ap2", // use your PUSHER_APP_CLUSTER from .env
  wsHost: "127.0.0.1",
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  authEndpoint: `${import.meta.env.VITE_HOST}broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${userFromLocalStorage?.token}`,
    },
  },
});

export default echo;
