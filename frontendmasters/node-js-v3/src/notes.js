import { insertDB, saveDB, getDB } from "./db.js";

export const newNote = async (note, tags) => {
  const newNote = {
    tags,
    id: Date.now(),
    content: note,
  }

  await insertDB(newNote)
  return newNote
}

export const getAllNotes = async () => {
  const { notes } = await getDB()
  return notes
}

export const findNotes = async (filter) => {
  const notes = await getAllNotes()
  return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const removeNote = async (id) => {
  const notes = await getAllNotes()
  const match = notes.find(note => note.id === id)

  if (match) {
    const cleansedNotes = notes.filter(note => note.id !== id)
    await saveDB({notes: cleansedNotes});
    return id
  }
}

export const removeAllNotes = () => saveDB({notes: []})
