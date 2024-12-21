use std::sync::Mutex;
use tauri::State;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct AudioFile {
    pub name: String,
    pub content: Vec<u8>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Instrument {
    pub file: AudioFile,
    pub num_ticks: u32,
}

pub struct InstrumentManager {
    instruments: Vec<Instrument>,
}

impl InstrumentManager {
    pub fn new() -> Self {
        Self {
            instruments: Vec::new(),
        }
    }

    pub fn add_instrument(&mut self, file: AudioFile, num_ticks: u32) {
        self.instruments.push(Instrument { file, num_ticks });
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
pub fn add_instrument(
    state: State<'_, Mutex<InstrumentManager>>,
    name: String,
    content: Vec<u8>,
    num_ticks: u32,
) {
    let mut manager = state.lock().unwrap();
    manager.add_instrument(AudioFile {name, content}, num_ticks);
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
