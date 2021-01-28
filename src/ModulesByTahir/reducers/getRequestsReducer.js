import {
  GET_LZW_REQUESTS,
  GET_LZW_NEW_REQUESTS_SOCKET
} from "../action/allActions";
const Initial_state = {
  LZW_requests: []
};

const getRequestsReducer = (state = Initial_state, action) => {
  switch (action.type) {
    case GET_LZW_REQUESTS: {
      return {
        ...state,
        LZW_requests: action.response
      };
    }
    case GET_LZW_NEW_REQUESTS_SOCKET: {
      //   const LZW_requests = state.LZW_requests.slice().map(item => {
      //     if (item.REPAIRE_MT_ID == action.response[0].REPAIRE_MT_ID) {
      //       console.log(item);
      //       return {
      //         item: action.response[1]
      //       };
      //     }
      //     return item;
      //   });
      //   console.log(action.response);
      const LZW_requests = state.LZW_requests;
      for (var i = 0; i < LZW_requests.length; i++) {
        if (LZW_requests[i].REPAIRE_MT_ID == action.response[0].REPAIRE_MT_ID) {
          LZW_requests.splice(i, 1);
        }
      }
      var FoundNewArray = LZW_requests;
      FoundNewArray.unshift(action.response[0]);
      //   console.log(FoundNewArray);
      return {
        ...state,
        LZW_requests: [...(LZW_requests || [])]
      };
    }
    //   return Object.assign({}, state, {
    //     LZW_requests: action.response
    //   });

    default: {
      return {
        ...state
      };
    }
  }
};
export default getRequestsReducer;
