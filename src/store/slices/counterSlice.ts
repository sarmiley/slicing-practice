import { createAppAsyncThunk } from "@/utils/helpers/thunkHelper"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

/**
 * 定義此 slice 的 initialState
 */
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

const incrementAsync = createAppAsyncThunk(
  `${counterSlice.name}/incrementAsync`,
  async (amount: number, thunkAPI) => {
    const response: { body: number } = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ body: 2 })
      }, 2000)
    })

    if (response.body === 2) {
      thunkAPI.dispatch(counterSlice.actions.incrementByAmount(amount))
    }

    // return value
    return { counter: thunkAPI.getState().counter.value }
  }
)

export const { increment, decrement } = counterSlice.actions
export { incrementAsync }
export default counterSlice
