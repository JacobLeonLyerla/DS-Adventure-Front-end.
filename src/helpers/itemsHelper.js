
 import axios from "axios";
 export function currentRoom ( id ) {
    axios
      .get(`https://dungeon-run.herokuapp.com/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
        let roomLoot = {};
        let roomFilter = this.state.area.items.filter(item => {
          let failed = false;
          let secondfailed = false;
          this.state.player.items.forEach(playerItem => {
            if (playerItem._id !== item._id) {
              return;
            } else {
              return (failed = true);
            }
          });
          this.state.player.gear.forEach(InventoryItem => {
            if (InventoryItem._id !== item._id) {
              return;
            } else {
              return (secondfailed = true);
            }
          });

          return failed === false && secondfailed === false;
        });

        roomLoot.items = roomFilter;
        this.setState({ area: { items: roomLoot.items } });
      });
  };
export function currentPlayer ( id ) {
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
        this.currentRoom(this.state.player.currentLocation._id);
      });
  };

  export default deleteItem(type, loot) {
    console.log(loot, type);
    let items = {};
    switch (type) {
      case "Loot":
        items.items = [];

        this.state.player.items.push(loot._id);

        items.items = this.state.player.items;

        axios
          .put(
            `https://dungeon-run.herokuapp.com/players/${
              this.state.player._id
            }`,
            items
          )
          .then(() => {
            axios
              .get(
                `https://dungeon-run.herokuapp.com/players/${
                  this.state.player._id
                }`
              )
              .then(response => {
                this.setState({ player: response.data });
                this.currentRoom(this.state.player.currentLocation._id);
              });
          });

        break;
      case "Inventory":
      case "Equip":
        if (type === "Inventory") {
          items.items = this.state.player.items.filter(
            item => item._id !== loot._id
          );

          this.state.player.gear.push(loot._id);

          items.gear = this.state.player.gear;

          items.items = this.state.player.items;

          items[loot.slot] = "Equipped";

          items.health = this.state.player.health += loot.health;

          items.endurance = this.state.player.endurance += loot.endurance;

          items.intellect = this.state.player.intellect += loot.intellect;

          items.strength = this.state.player.strength += loot.strength;

          items.agility = this.state.player.agility += loot.agility;
        } else if (type === "Equip") {
          items.gear = this.state.player.gear.filter(
            item => item._id !== loot._id
          );
          this.state.player.items.push(loot._id);

          items.items = this.state.player.items;
        }
        break;
      case "Drop Item":
        items.items = this.state.player.items.filter(
          item => item._id !== loot._id
        );
        break;

      default:
        break;
    }

    axios
      .put(
        `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
        items
      )

      .then(response => {
        axios
          .get(
            `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`
          )

          .then(response => {
            this.setState({ player: response.data });
            this.currentRoom(this.state.player.currentLocation._id);
          })

          .catch(err => {});
        if (type === "Equip") {
          this.removeEquipment(loot);
        }

        //window.location.reload();
      });
  }
