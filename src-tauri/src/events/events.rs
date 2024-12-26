pub enum EventList {
    MainPages,
    SystemTick,
    GeneralTick,
    NewModalEvent,
    HideModalEvent
}

impl EventList {
    pub fn as_str(&self) -> &'static str {
        match self {
            EventList::MainPages => "MainPages",
            EventList::SystemTick => "SystemTick",
            EventList::GeneralTick => "GeneralTick",
            EventList::NewModalEvent => "NewModalEvent",
            EventList::HideModalEvent => "HideModalEvent",
        }
    }
}