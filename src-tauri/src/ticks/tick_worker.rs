use std::sync::{Arc, Mutex};
use std::time::Duration;
use tauri::async_runtime::{spawn, JoinHandle};
use tokio::time::interval;
use tauri::async_runtime::Mutex as AsyncMutex;
use crate::events::event_emitter::EventEmitter;
use crate::events::events::EventList::{GeneralTick, SystemTick};
use crate::ticks::js_tick_sender::send_general_tick_event;

const SUBTICKS_BY_TICK: u8 = 5;

#[derive(Default)]
pub struct TickWorker {
    tick: u32,
    interval_handle: Option<JoinHandle<()>>,
}

#[tauri::command]
pub async fn playing_state(
    state: tauri::State<'_, Arc<Mutex<TickWorker>>>,
    emitter: tauri::State<'_, Arc<AsyncMutex<EventEmitter>>>,
    app_handle: tauri::AppHandle,
    tick_interval: f64,
    ticks_by_loop: u16
) -> Result<(), String> {
    let mut tick_worker_state = state.lock().unwrap();
    
    // If there is an interval currently running, don't play a new one
    if tick_worker_state.interval_handle.is_some() {
        return Ok(());
    }

    let tick = Arc::clone(&state);
    let emitter_instance = Arc::clone(&emitter);
    let app_handle_clone = app_handle.clone();

    let handle = spawn(async move {
        let mut interval = interval(Duration::from_secs_f64(tick_interval / 1000.0));
        let emitter_final = emitter_instance.lock().await;
        loop {
            interval.tick().await;
            let mut tick_worker_state = tick.lock().unwrap();
            let tick_str = tick_worker_state.tick.to_string();

            if tick_worker_state.tick % SUBTICKS_BY_TICK as u32 == 0 {
                if tick_worker_state.tick >= ticks_by_loop.into() {
                    tick_worker_state.tick = 0;
                }

                emitter_final.emit(GeneralTick.as_str(), tick_str.clone());
                send_general_tick_event(app_handle_clone.clone(), tick_worker_state.tick, true);
            }

            emitter_final.emit(SystemTick.as_str(), tick_str.clone());
            tick_worker_state.tick += 1;
        }
    });

    tick_worker_state.interval_handle = Some(handle);
    Ok(())
}

#[tauri::command]
pub async fn paused_state(state: tauri::State<'_, Arc<Mutex<TickWorker>>>) -> Result<(), String> {
    let mut tick_worker_state = state.lock().unwrap();
    if let Some(handle) = tick_worker_state.interval_handle.take() {
        handle.abort();
    }
    Ok(())
}

#[tauri::command]
pub async fn stopped_state(
    state: tauri::State<'_, Arc<Mutex<TickWorker>>>,
    app_handle: tauri::AppHandle
) -> Result<(), String> {
    let _ = paused_state(state.clone()).await;
    let app_handle_clone = app_handle.clone();
    let mut tick_worker_state = state.lock().unwrap();
    tick_worker_state.tick = 0;
    send_general_tick_event(app_handle_clone.clone(), 0, false);
    println!("Tick reset to 0");
    Ok(())
}