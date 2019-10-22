import { 
  CREATE, 
  OPEN_FORM, 
  CLOSE_FORM,
  SEED,
  IS_DELETING,
  DELETED
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
export const isDeleting = () => dispatch => {
  dispatch({ type: IS_DELETING})
}
export const deleted = () => dispatch => {
  dispatch({ type: DELETED})
}