use std::sync::Arc;
use serde::Serialize;
use tokio::task;
use tauri::async_runtime::Mutex as AsyncMutex;
use crate::events::event_emitter::EventEmitter;
use crate::events::events::EventList::SystemTick;
use crate::utils::default_values::{SYSTEM_MAX_TICKS, GENERAL_MAX_TICKS, SUBTICKS_BY_TICK};

#[derive(Debug, Clone, Serialize)]
pub struct InstrumentTickManager {
    tick_positions: Vec<bool>,
    general_tick_positions: Vec<bool>,
    max_num_ticks: usize,
    tick: usize
}

impl InstrumentTickManager {
    pub async fn new(num_ticks: usize, emitter: Arc<AsyncMutex<EventEmitter>>) -> Arc<AsyncMutex<Self>> {
        let manager = Arc::new(AsyncMutex::new(Self {
            tick_positions: create_new_tick_positions_map(SYSTEM_MAX_TICKS),
            general_tick_positions: create_new_tick_positions_map(GENERAL_MAX_TICKS),
            max_num_ticks: 0,
            tick: 0
        }));

        let cloned_manager = manager.clone();
        manager.lock().await.register_listeners(emitter, cloned_manager).await;
        manager.lock().await.set_new_max_num_ticks(num_ticks);

        manager
    }

    async fn register_listeners(&self, emitter: Arc<AsyncMutex<EventEmitter>>, manager: Arc<AsyncMutex<Self>>) {
        let mut system_tick_listener = emitter.lock().await.on(SystemTick.as_str());

        task::spawn(async move {
            while let Ok(payload) = system_tick_listener.recv().await {
                if let Ok(tick_number) = payload.parse::<usize>() {
                    let cloned_manager = manager.clone();
                    cloned_manager.lock().await.tick_listener(tick_number).await;
                }
            }
        });
    }

    async fn tick_listener(&mut self, tick_number: usize) {
        if tick_number == 0 || self.tick >= self.max_num_ticks {
            self.tick = 0;
        } else {
            self.tick += 1;
        }

        if self.tick_positions[self.tick] {
            println!("Todo!! Play sound");
        }
    }

    pub fn set_new_max_num_ticks(&mut self, num_ticks: usize) {
        self.max_num_ticks = (num_ticks + 1) * (SUBTICKS_BY_TICK as usize) - 1;
    }

    pub fn update_tick_position(&mut self, index: usize) {
        let actual_value = self.general_tick_positions[index];
        self.general_tick_positions[index] = !actual_value;
        self.tick_positions[index * SUBTICKS_BY_TICK as usize] = !actual_value;
    }

}

fn create_new_tick_positions_map (max_ticks: u32) -> Vec<bool> {
    let mut tick_positions = Vec::new();
    for _i in 0..max_ticks {
        tick_positions.push(false);
    }
    tick_positions
}