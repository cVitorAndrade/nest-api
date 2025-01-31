import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';

let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to create note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'Note title',
      userId: '19a1c11d-2c3f-4952-a0c7-ea792f220c68',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
