export function setButtonStyle(id, curClass) {
  if (curClass !== "" && curClass !== undefined) {
    if (id !== curClass) {
      return "class-not-picked";
    }
  }
}
//All of my buttons call this in the creat component,  they pass in the id in this case a class name,
// if the id does not match the currently selected this.state.button than they get the className
// "class-not-picked" that lowers the opacity in order to high light the one that is picked
export function setClass(selected, preview) {
  this.setState({ class: selected, preview });
}


/*********** I DON'T KNOW IF I AM USING THIS ANYMORE? it has been a bit since I started this code */
// this  sets the class name on state i to render a banner telling the user what class is selected
export function handleClass(input) {
  if (this.state.class === "") {
    this.setState({ class: input });
  }
}
