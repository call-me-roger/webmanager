const initSate = {
  projects: [
    {
      id: "1",
      title: "Help me find peach",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    },
    {
      id: "2",
      title: "Collect all the stars",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    },
    {
      id: "3",
      title: "Egg hunt with Yoshi",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    }
  ]
};

const projectReducer = (state = initSate, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      console.log("Project Created", action.project);
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("Error on creating project", action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
