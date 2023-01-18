import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
    appId: "1540436",
    key: `${process.env.NEXT_PUBLIC_PUSHER_KEY}`,
    secret: `${process.env.NEXT_PUBLIC_PUSHER_SECRET}`,
    cluster: "eu",
    useTLS: true
})

export const clientPusher = new ClientPusher(
    `${process.env.NEXT_PUBLIC_CLIENT_PUSHER}`, {
        cluster: 'eu',
        forceTLS: true,
    })

// export const clientPusher = new ClientPusher(
// "427346c0d8aa4667c901", {
//   cluster: "eu",
// });

// export const serverPusher = new Pusher({
//     appId: "1540436",
//     key: "427346c0d8aa4667c901",
//     secret: "d34688eca9034f9a82b5",
//     cluster: "eu",
//     useTLS: true
// })

