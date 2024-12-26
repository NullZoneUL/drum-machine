use serde::Serialize;
use tokio::task;
use crate::events::event_emitter::EventEmitter;
use crate::events::events::EventList::SystemTick;
use crate::utils::default_values::{SYSTEM_MAX_TICKS, GENERAL_MAX_TICKS, SUBTICKS_BY_TICK};

#[derive(Debug, Clone, Serialize)]
pub struct InstrumentTickManager {
    tick_positions: Vec<bool>,
    general_tick_positions: Vec<bool>,
    max_num_ticks: u32,
    tick: u32
}

impl InstrumentTickManager {
    pub fn new(num_ticks: u32) -> Self {
        let mut manager = Self {
            tick_positions: create_new_tick_positions_map(SYSTEM_MAX_TICKS),
            general_tick_positions: create_new_tick_positions_map(GENERAL_MAX_TICKS),
            max_num_ticks: 0,
            tick: 0
        };
        let emitter = EventEmitter::new();
    
        let mut listener = emitter.on(SystemTick.as_str());
        task::spawn(async move {
            while let Ok(payload) = listener.recv().await {
                println!("Tick listener: {}", payload);
            }
        });

        manager.set_new_max_num_ticks(num_ticks);

        manager
    }

    fn set_new_max_num_ticks(&mut self, num_ticks: u32) {
        self.max_num_ticks = (num_ticks + 1) * (SUBTICKS_BY_TICK as u32) - 1;
    }

    fn tick_listener(&mut self) {
        let tick_number = 0; // Todo!!
        if tick_number == 0 || self.tick >= self.max_num_ticks {
            self.tick = 0;
        } else {
            self.tick += 1;
        }
      
        if self.tick_positions[self.tick as usize] == true {
            println!("Todo!! Play sound");
        }
    }
}

fn create_new_tick_positions_map (max_ticks: u32) -> Vec<bool> {
    let mut tick_positions = Vec::new();
    for _i in 0..max_ticks {
        tick_positions.push(false);
    }
    tick_positions
}