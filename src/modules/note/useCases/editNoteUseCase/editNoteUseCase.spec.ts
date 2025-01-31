import { makeUser } from 'src/modules/user/factories/userFactory';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { EditNoteUseCase } from './editNoteUseCase';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let editNoteUseCase: EditNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Edit note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];
    const newTitle = 'New title';
    const newDescription = 'New description';

    await editNoteUseCase.execute({
      title: newTitle,
      description: newDescription,
      noteId: note.id,
      userId: note.userId,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(newTitle);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(newDescription);
  });

  it('Should be able to throw error when not found note', async () => {
    const user = makeUser({});

    expect(async () => {
      await editNoteUseCase.execute({
        noteId: 'invalidId',
        userId: user.id,
        title: 'Note title',
        description: 'Note description',
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
      await editNoteUseCase.execute({
        noteId: note.id,
        userId: 'invalidId',
        title: 'Note title',
        description: 'Note description',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
