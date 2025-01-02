use tauri::Manager;
use serde_json::json;

#[tauri::command]
pub fn send_general_tick_event(app_handle: tauri::AppHandle, tick: u32, playing: bool) {
    let payload = json!({
        "tick": tick,
        "play": playing
    });

    app_handle.emit_all("general-tick-event", payload).unwrap();
}

/*#[tauri::command] // Not needed rn
pub fn send_system_tick_event(app_handle: tauri::AppHandle, tick: u32) {
    println!("System tick");
    app_handle.emit_all("system-system-event", tick).unwrap();
}*/