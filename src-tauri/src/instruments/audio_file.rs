#[derive(Debug, Clone)]
pub struct AudioFile {
    pub name: String,
    pub content: Vec<u8>,
}