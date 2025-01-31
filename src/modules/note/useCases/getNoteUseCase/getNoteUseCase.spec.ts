import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { makeNote } from '../../factories/noteFactory';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { GetNoteUseCase } from './getNoteUseCase';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';

let getNoteUseCase: GetNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to get note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    const foundNote = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(note).toEqual(foundNote);
  });

  it('Should be able to throw error when not found note', async () => {
    const user = makeUser({});

    expect(async () => {
      await getNoteUseCase.execute({
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
      await getNoteUseCase.execute({
        noteId: note.id,
        userId: 'invalidId',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
