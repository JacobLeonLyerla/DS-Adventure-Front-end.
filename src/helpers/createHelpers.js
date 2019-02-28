export function setButtonStyle(id, curClass) {
  if (curClass !== "" && curClass !== undefined) {
    if (id !== curClass) {
      return "class-not-picked";
    }
  }
}

export function handleInput(input) {
    this.setState({ [input.target.name]: input.target.value });
  
  };