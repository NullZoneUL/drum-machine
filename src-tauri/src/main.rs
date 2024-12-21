// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod instruments;

use instruments::{add_instrument, delete_instrument, InstrumentManager};
use std::sync::Mutex;

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(InstrumentManager::new()))
        .invoke_handler(tauri::generate_handler![
            add_instrument,
            delete_instrument
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
