
const initialState = {
  activities: [],
  isFormOpen: false,
  activity: {}
};

const activityReducer = (state = initialState, action) => {
  switch(action.type){
    case 'CREATE': {
      return Object.assign({}, state, {
        activities: [...state.activities.concat(action.payload)]
      })
    }
    case 'CLOSE': {
      return Object.assign({}, state, {
        isFormOpen: false
      })
    }
    case 'OPEN': {
      return Object.assign({}, state, {
        isFormOpen: true,
        activity: {...action.payload}
      })
    }
    case 'SEED': {
      const data = action.payload;
      return {
        ...state,
        activities: [...data]
      }
    }
    default: {
      return state;
    }
  }
}

export default activityReducer;
