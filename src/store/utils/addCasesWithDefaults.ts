import { ActionReducerMapBuilder, AsyncThunk, CaseReducer, Draft } from '@reduxjs/toolkit';

import { AsyncProgress } from '../slices/types';



export function addCasesWithDefaults<V extends keyof S, S, R, T, ThunkApiConfig>(
  builder: ActionReducerMapBuilder<S>,
  asyncThunk: AsyncThunk<R, T, ThunkApiConfig>,
  progressProp: V extends keyof Draft<S> ? (Draft<S>[V] extends AsyncProgress ? V : never) : never,
  reducer: CaseReducer<S, ReturnType<typeof asyncThunk.fulfilled>>
): ActionReducerMapBuilder<S> {
  return builder
    .addCase(asyncThunk.pending, (state) => {
      (state as Record<string, unknown>)[progressProp as string] = true;
    })
    .addCase(asyncThunk.rejected, (state) => {
      console.error('Async thunk was rejected:');
      console.debug(asyncThunk);
      (state as Record<string, unknown>)[progressProp as string] = false;
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      let progressRes: null | false = null;
      try {
        reducer(state, action);
      } catch (e) {
        progressRes = false;
        console.error('Reducer (1) for async thunk (2) failed');
        console.debug(reducer);
        console.debug(asyncThunk);
        console.error(e);
      }
      (state as Record<string, unknown>)[progressProp as string] = progressRes;
    });
}
