import { Injectable } from '@nestjs/common';
import { Note } from '../../entites/note';
import { NoteRepository } from '../../repositories/noteRepository';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(createNoteRequest: CreateNoteRequest) {
    const note = new Note(createNoteRequest);
    await this.noteRepository.create(note);
    return note;
  }
}
