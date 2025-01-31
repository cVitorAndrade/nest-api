import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { makeNote } from '../../factories/noteFactory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let deleteNoteUseCase: DeleteNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Delete note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to delete note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];
    expect(noteRepositoryInMemory.notes).toEqual([note]);

    await deleteNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });
    expect(noteRepositoryInMemory.notes).toEqual([]);
  });

  it('Should be able to throw error when not found note', async () => {
    const user = makeUser({});

    expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: 'invalidId',
        userId: user.id,
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw error when user is not note owner', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: note.id,
        userId: 'invalidId',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
