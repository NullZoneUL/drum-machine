use std::sync::{Arc, Mutex};
use tauri::State;
use serde::Serialize;
use tauri::async_runtime::Mutex as AsyncMutex;
use crate::events::event_emitter::EventEmitter;
use super::instrument_tick_manager::InstrumentTickManager;

#[derive(Debug, Clone, Serialize)]
pub struct AudioFile {
    pub name: String,
    pub content: Vec<u8>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Instrument {
    pub file: AudioFile,
    pub num_ticks: u32,
    pub manager: InstrumentTickManager
}

pub struct InstrumentManager {
    instruments: Vec<Instrument>,
}

impl Instrument {
    async fn new(file: AudioFile, num_ticks: u32, emitter: Arc<AsyncMutex<EventEmitter>>) -> Self {
        let manager = InstrumentTickManager::new(num_ticks, emitter).await;
        let manager_instance = manager.lock().await.clone();

        Self {
            file,
            num_ticks,
            manager: manager_instance
        }
    }
}

impl InstrumentManager {
    pub fn new() -> Self {
        Self {
            instruments: Vec::new(),
        }
    }

    pub async fn add_instrument(&mut self, file: AudioFile, num_ticks: u32, emitter: Arc<AsyncMutex<EventEmitter>>) {
        let instrument = Instrument::new(file, num_ticks, emitter).await;
        self.instruments.push(instrument);
    }

    pub fn delete_instrument(&mut self, index: usize) -> bool {
        if index < self.instruments.len() {
            self.instruments.remove(index);
            true
        } else {
            false
        }
    }

    pub fn get_instruments(&self) -> Vec<Instrument> {
        self.instruments.clone()
    }
}

#[tauri::command]
pub async fn add_instrument(
    state: State<'_, AsyncMutex<InstrumentManager>>,
    emitter: tauri::State<'_, Arc<AsyncMutex<EventEmitter>>>,
    name: String,
    content: Vec<u8>,
    num_ticks: u32,
) -> Result<(), String> {
    let emitter_instance = Arc::clone(&emitter);
    let mut manager = state.lock().await;
    manager.add_instrument(AudioFile {name, content}, num_ticks, emitter_instance).await;
    Ok(())
}

#[tauri::command]
pub fn delete_instrument(state: State<'_, Mutex<InstrumentManager>>, index: usize) {
    let mut manager = state.lock().unwrap();
    manager.delete_instrument(index);
}

pub fn get_instruments(state: State<'_, Mutex<InstrumentManager>>) -> Vec<Instrument> {
    let manager = state.lock().unwrap();
    manager.get_instruments()
}
