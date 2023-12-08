import { AppDispatch, RootState } from "@/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

/**
 * Pre-Typed createAsyncThunk
 * can have the types for state, dispatch, and extra built in
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()
