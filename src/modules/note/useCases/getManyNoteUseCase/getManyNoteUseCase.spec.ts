import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetManyNoteUseCase } from './getManyNoteUseCase';

let getManyNoteUseCase: GetManyNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get many note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getManyNoteUseCase = new GetManyNoteUseCase(noteRepositoryInMemory);
  });
});
