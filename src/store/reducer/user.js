// data yang akan di tambahkan setelah mendapatkan data
const initialState = {
  users: [],
  data: [],
  isLoading: false,
  isError: false,
  message: ""
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case "GETUSER_PENDING": {
      return {
        ...state
      };
    }
    case "GETUSER_FULFILLED": {
      return {
        ...state,
        users: action.payload.data.data[0]
      };
    }
    case "GETUSER_REJECTED": {
      return {
        ...state
      };
    }
    case "UPDATEPASSWORD_PENDING": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: ""
      };
    }
    case "UPDATEPASSWORD_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message
      };
    }
    case "UPDATEPASSWORD_REJECTED": {
      return {
        ...state,
        isLoading: true,
        isError: true
      };
    }
    case "GETDASHBOARD_PENDING": {
      return {
        ...state,
        data: [],
        isLoading: false,
        isError: false,
        message: ""
      };
    }
    case "GETDASHBOARD_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        message: action.payload.message
      };
    }
    case "GETDASHBOARD_REJECTED": {
      return {
        ...state,
        isLoading: true,
        isError: true,
        data: [],
        message: action.payload.message
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}