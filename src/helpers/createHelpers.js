import axios from "axios";
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
  // this is a function to post a new adventurer  to the database,
  // it pulls the data off the payload and sets it into a object
  //with a few basic checks but i actually have set the checks to handle on the back end so the checks here are
  // really just second lines of defense


export function addPlayer(e) {
  e.preventDefault();

  this.state.redirect = false;

  const player = {};

  if (this.state.name !== "") {
    // if they are not empty then set the player objects key of email is set to the email on the state,
    if (this.state.name.length > 30) {
      alert(
        `${this.state.name} is too is ${
          this.state.name.length
        }, and the name must be less than 30 characters`
      );
      this.setState({ name: "" });
    } else {
      player.name = this.state.name;
    }
  }

  if (this.state.email !== "") {
    // if they are not empty then set the player objects key of email is set to the email on the state,
    if (this.state.email.length > 30) {
      alert(
        `${this.state.email} is too is ${
          this.state.email.length
        }, and the name must be less than 30 characters`
      );
      this.setState({ email: "" });
    } else {
      player.email = this.state.email;
    }
  }

  if (this.state.password !== "") {
    if (this.state.password.length > 30) {
      alert(
        `${this.state.password} is too is ${
          this.state.password.length
        }, and the name must be less than 30 characters`
      );

      this.setState({ password: "", password2: "" });
    } else {
      if (this.state.password === this.state.password2) {
        player.password = this.state.password;
        player.password2 = this.state.password2;
      } else {
        alert("passwords did not match");
        this.setState({ password: "", password2: "" });
      }
    }
  }

  // this is a switch that takes the class entered and than
  // applies a set of base stats to the player
  // along side of spells and the strings for animation
  if (this.state.class !== "") {
    let test = this.state.class;
    switch (test) {
      case "Ranger":
        player.idle = "rangeridle";

        player.battle = "rangerbattle";

        player.health = 160;

        player.endurance = 140;

        player.agility = 20;

        player.strength = 5;

        player.intellect = 10;

        player.attacks = [
          "5b68f678bc349a910c4b2402",

          "5b68f616bc349a910c4b2401",

          "5b66bd38667d32785c749ff8"
        ];

        break;
      case "Warrior":
        player.idle = "warrioridle";

        player.battle = "warriorbattle";

        player.endurance = 100;

        player.health = 200;

        player.intellect = 5;

        player.agility = 5;

        player.strength = 25;

        player.attacks = [
          "5b68eed2bc349a910c4b23f8",

          "5b68ee71bc349a910c4b23f7",

          "5b68edb6bc349a910c4b23f6"
        ];
        break;
      case "Mage":
        player.idle = "mageidle";

        player.battle = "magebattle";

        player.endurance = 200;

        player.health = 100;

        player.intellect = 25;

        player.agility = 5;

        player.strength = 0;

        player.attacks = [
          "5b68ef26bc349a910c4b23f9",

          "5b68efb3bc349a910c4b23fa",

          "5b68f0aebc349a910c4b23fb"
        ];
        break;
      default:
    }

    player.class = this.state.class;
  }
  if (this.state.bio !== "") {
    player.bio = this.state.bio;
  }
  if (this.state.age !== "") {
    player.age = this.state.age;
  }
  if (this.state.gender !== "") {
    player.gender = this.state.gender;
  }
  player.currentLocation = "5b60093b9a47813e2cdd30d1";
  axios
    .post("https://dungeon-run.herokuapp.com/auth/register", player)
    .then(response => {
      this.props.setPlayer("reload");
      this.state.redirect = true;
      this.setState({
        name: "",

        password: "",

        password2: "",

        age: "",

        bio: "",

        class: "",

        gender: "",

        email: "",

        button: "",

        preview: ""
      });
    });
}

