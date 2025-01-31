import { Note } from '../entites/note';
import { NoteRepository } from './noteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async findById(noteId: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === noteId);
    if (!note) return null;

    return note;
  }

  async delete(noteId: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  async save(note: Note): Promise<void> {
    const noteIndex = this.notes.findIndex(
      (currentNote) => currentNote.id === note.id,
    );

    const indexIsValid = noteIndex >= 0;
    if (indexIsValid) this.notes[noteIndex] = note;
  }

  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Note[]> {
    throw new Error('Method not implemented.');
  }
}
