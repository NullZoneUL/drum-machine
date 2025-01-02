use std::sync::{Arc, Mutex};
use tauri::State;
use tauri::async_runtime::Mutex as AsyncMutex;
use crate::events::event_emitter::EventEmitter;
use super::instrument_tick_manager::InstrumentTickManager;

#[derive(Debug, Clone)]
pub struct AudioFile {
    pub name: String,
    pub content: Vec<u8>,
}

#[derive(Debug, Clone)]
pub struct Instrument {
    pub file: AudioFile,
    pub manager: Arc<AsyncMutex<InstrumentTickManager>>
}

pub struct InstrumentManager {
    instruments: Vec<Instrument>,
}

impl Instrument {
    async fn new(file: AudioFile, num_ticks: usize, emitter: Arc<AsyncMutex<EventEmitter>>) -> Self {
        let manager = InstrumentTickManager::new(num_ticks, emitter).await;

        Self {
            file,
            manager
        }
    }
}

impl InstrumentManager {
    pub fn new() -> Self {
        Self {
            instruments: Vec::new(),
        }
    }

    pub async fn add_instrument(&mut self, file: AudioFile, num_ticks: usize, emitter: Arc<AsyncMutex<EventEmitter>>) {
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
    num_ticks: usize,
) -> Result<(), String> {
    let emitter_instance = Arc::clone(&emitter);
    let mut manager = state.lock().await;
    manager.add_instrument(AudioFile {name, content}, num_ticks, emitter_instance).await;
    Ok(())
}

#[tauri::command]
pub async fn delete_instrument(
    state: State<'_, AsyncMutex<InstrumentManager>>,
    index: usize
) -> Result<(), String> {
    let mut manager = state.lock().await;
    manager.delete_instrument(index);
    Ok(())
}

#[tauri::command]
pub async fn on_button_roll_clicked(
    state: State<'_, AsyncMutex<InstrumentManager>>,
    instrument_index: usize,
    index: usize
) -> Result<(), String> {
    let manager = state.lock().await;
    manager.instruments[instrument_index].manager.lock().await.update_tick_position(index);
    Ok(())
}

#[tauri::command]
pub async fn set_new_max_num_ticks(
    state: State<'_, AsyncMutex<InstrumentManager>>,
    instrument_index: usize,
    max_ticks: usize
) -> Result<(), String> {
    let manager = state.lock().await;
    if manager.instruments.len() > instrument_index {
        manager.instruments[instrument_index].manager.lock().await.set_new_max_num_ticks(max_ticks);
    }
    Ok(())
}

pub fn get_instruments(state: State<'_, Mutex<InstrumentManager>>) -> Vec<Instrument> {
    let manager = state.lock().unwrap();
    manager.get_instruments()
}
