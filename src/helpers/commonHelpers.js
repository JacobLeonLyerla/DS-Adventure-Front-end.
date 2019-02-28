export function handleInput(input) {
    this.setState({ [input.target.name]: input.target.value });
  
  };