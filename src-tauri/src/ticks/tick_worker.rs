use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};
use std::thread;
use crate::events::events::EventList::{GeneralTick, SystemTick};

const SUBTICKS_BY_TICK: u8 = 5;

pub struct TickWorker {
    tick_number: u32,
    tick_interval: f64,
    is_running: Arc<Mutex<bool>>
}

impl TickWorker {
    pub fn new() -> Self {
        Self {
            tick_number: 0,
            tick_interval: 0_f64,
            is_running: Arc::new(Mutex::new(false))
        }
    }

    fn playing(&mut self, tick_interval: f64, ticks_by_loop: u16) {
        self.tick_interval = tick_interval;

        let is_running = Arc::clone(&self.is_running);
        *is_running.lock().unwrap() = true;

        let is_running_clone = Arc::clone(&is_running);

        thread::spawn(move || {
            let interval = Duration::from_secs_f64(tick_interval / 1000.0);
            let mut next_tick = Instant::now() + interval;

            while *is_running_clone.lock().unwrap() {
                //TODO!!! Resolve 'self' issue here
                /*if self.tick_number % SUBTICKS_BY_TICK as u32 == 0 {
                    if self.tick_number >= ticks_by_loop.into() {
                        self.tick_number = 0;
                    }
                    println!("{} tick! {}", GeneralTick.as_str(), self.tick_number);
                    /*self.postMessage({
                      type: 'generalTick',
                      number: tickNumber,
                      play: true,
                    });*/
                }
                //self.postMessage({ type: 'systemTick', number: tickNumber });*/
        
                //self.tick_number += 1;

                // Calculate the time untile the next call
                let now = Instant::now();
                if now < next_tick {
                    thread::sleep(next_tick - now);
                }
                next_tick += interval;
            }
        });
        println!("Playing!!! {} {}", tick_interval, ticks_by_loop);
    }

    fn paused(&mut self) {
        *self.is_running.lock().unwrap() = false;
        println!("Paused!!!");
    }

    fn stopped(&self) {
        println!("Stopped!!!");
    }
}

#[tauri::command]
pub fn playing_state(state: tauri::State<'_, Mutex<TickWorker>>, tick_interval: f64, ticks_by_loop: u16) {
    let mut worker = state.lock().unwrap();
    worker.playing(tick_interval, ticks_by_loop);
}

#[tauri::command]
pub fn paused_state(state: tauri::State<'_, Mutex<TickWorker>>) {
    let mut worker = state.lock().unwrap();
    worker.paused();
}

#[tauri::command]
pub fn stopped_state(state: tauri::State<'_, Mutex<TickWorker>>) {
    let worker = state.lock().unwrap();
    worker.stopped();
}