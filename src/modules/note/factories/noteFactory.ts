import { Note } from '../entites/note';

type Override = Partial<Note>;
export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Note title',
      userId: 'fakeId',
      description: '',
      ...override,
    },
    id,
  );
};
