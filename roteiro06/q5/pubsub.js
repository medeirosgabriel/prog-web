const subscribers = {};

async function subscribe(sub, topic) {
    if (!subscribers[topic]) {
        subscribers[topic] = []
    }
    subscribers[topic].push(sub)
}

async function post(topic, message) {
    subscribers[topic].forEach((sub) => {
        sub.receive(message)
    })
}

export const pubsub = {
    subscribe,
    post,
};
