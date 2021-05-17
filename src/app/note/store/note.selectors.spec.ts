import * as fromNote from './note.reducer';
import { selectNoteState } from './note.selectors';

describe('Note Selectors', () => {
  it('should select the feature state', () => {
    const result = selectNoteState({
      [fromNote.noteFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
