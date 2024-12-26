use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tokio::sync::broadcast;

type EventCallback = Box<dyn Fn(String) + Send + Sync>;

#[derive(Clone)]
pub struct EventEmitter {
    subscribers: Arc<Mutex<HashMap<String, broadcast::Sender<String>>>>,
}

impl EventEmitter {
    pub fn new() -> Self {
        Self {
            subscribers: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub fn on(&self, event_name: &str) -> broadcast::Receiver<String> {
        let mut subscribers = self.subscribers.lock().unwrap();

        let sender = subscribers
            .entry(event_name.to_string())
            .or_insert_with(|| broadcast::channel(16).0);

        sender.subscribe()
    }

    pub fn emit(&self, event_name: &str, payload: String) {
        let subscribers = self.subscribers.lock().unwrap();
        if let Some(sender) = subscribers.get(event_name) {
            let _ = sender.send(payload);
        }
    }
}
