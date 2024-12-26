// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod instruments;
mod utils;
mod events;

use instruments::instruments::{add_instrument, delete_instrument, InstrumentManager};
use std::sync::Mutex;
use tokio::runtime::Runtime;

fn main() {
    let runtime = Runtime::new().expect("Failed to create Tokio runtime");
    runtime.block_on(async {
        tauri::Builder::default()
            .manage(Mutex::new(InstrumentManager::new()))
            .invoke_handler(tauri::generate_handler![
                add_instrument,
                delete_instrument
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    });
}
