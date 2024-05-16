class WebhookService {
  constructor() {
    this.subscribers = [];
  }

  // Subscribe to webhook events
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  // Notify subscribers of an event
  notify(eventData) {
    this.subscribers.forEach((subscriber) => {
      subscriber(eventData);
    });
  }
}

module.exports = WebhookService;
