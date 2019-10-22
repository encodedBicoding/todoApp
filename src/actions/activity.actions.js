import { 
  CREATE, 
  OPEN_FORM, 
  CLOSE_FORM,
  SEED
} from '../action_types/activity.types';

export const createActivity = (activity) => dispatch => {
  dispatch({ type: CREATE, payload: activity})
}
export const closeForm = () => dispatch => {
  dispatch({ type: CLOSE_FORM})
}

export const openForm = (activity) => dispatch => {
  dispatch({ type: OPEN_FORM, payload: activity ? activity : ''})
}
export const seedDb = (data) => dispatch => {
  dispatch({ type: SEED, payload: data})
} 