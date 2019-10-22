
const initialState = {
  activities: [],
  isFormOpen: false,
  activity: {},
  isDeleting: false,
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
    case 'IS_DELETING': {
      return Object.assign({}, state, {
        isDeleting: true,
      })
    }
    case 'DELETED': {
      return Object.assign({}, state, {
        isDeleting: false
      })
    }
    default: {
      return state;
    }
  }
}

export default activityReducer;
