const ActionType = {
    UpdateStepInfo: 'UpdateStepInfo',
    UpdateLog: 'UpdateLog',
}

const action = (type, payload) => {
    return {
        type: type,
        payload: payload,
    }
}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.UpdateStepInfo:
            return Object.assign({}, state, { stepInfo: action.payload })
        case ActionType.UpdateLog:
            return Object.assign({}, state, { log: action.payload })
        default:
            return state
    }
}

const preloadedState = {
    stepInfo: {},
    log: 'hello',
}


export default { ActionType, action, reducer, preloadedState }