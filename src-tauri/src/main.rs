// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod instruments;
mod utils;
mod events;
mod ticks;

use instruments::instruments::{add_instrument, delete_instrument, on_button_roll_clicked, set_new_max_num_ticks, InstrumentManager};
use ticks::tick_worker::{playing_state, paused_state, stopped_state, TickWorker};
use events::event_emitter::EventEmitter;
use std::sync::{Arc, Mutex};
use tokio::runtime::Runtime;
use tauri::async_runtime::Mutex as AsyncMutex;

fn main() {
    let runtime = Runtime::new().expect("Failed to create Tokio runtime");
    runtime.block_on(async {
        tauri::Builder::default()
            .manage(AsyncMutex::new(InstrumentManager::new()))
            .manage(Arc::new(Mutex::new(TickWorker::default())))
            .manage(Arc::new(AsyncMutex::new(EventEmitter::new())))
            .invoke_handler(tauri::generate_handler![
                add_instrument,
                delete_instrument,
                playing_state,
                paused_state,
                stopped_state,
                on_button_roll_clicked,
                set_new_max_num_ticks
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    });
}
