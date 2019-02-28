export function setButtonStyle(id, curClass) {
  if (curClass !== "" && curClass !== undefined) {
    if (id !== curClass) {
      return "class-not-picked";
    }
  }
}

export function setClass(selected, preview) {
  this.setState({ class: selected, preview });
}
