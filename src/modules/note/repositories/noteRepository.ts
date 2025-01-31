import { Note } from '../entites/note';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
  abstract findById(noteId: string): Promise<Note | null>;
  abstract delete(noteId: string): Promise<void>;
  abstract save(note: Note): Promise<void>;
  abstract findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Note[]>;
}
