import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NoteRepository } from '../../repositories/noteRepository';

interface EditeNoteRequest {
  title: string;
  description: string | null;
  noteId: string;
  userId: string;
}

@Injectable()
export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, description, noteId, userId }: EditeNoteRequest) {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new NotFoundException();

    const isNotNoteOwner = note.userId !== userId;
    if (isNotNoteOwner) throw new UnauthorizedException();

    note.title = title;
    note.description = description ?? null;

    this.noteRepository.save(note);
    return note;
  }
}
