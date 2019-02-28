  // this takes the event and sets it on state, the event here is the
  // onChange from my input fields
export function handleInput(input) {
    this.setState({ [input.target.name]: input.target.value });
  
  };