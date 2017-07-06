import React from "react";

import { findMatchingItem, pluralizeUnit, singularizeUnit } from
    "../utils/item_helpers";
import { allMeasurements } from "../utils/measurements";
import { formCategory } from "../utils/item_categories";
import { addItemStyle, hintTextStyle } from "../utils/material_ui_styles";
import { TextField } from "material-ui";

function ErrorBanner(props) {
  if (props.shouldShow) {
    return (<div className="grocery-item-error">{ props.message }</div>);
  }
  return null;
}

class GroceryItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: -1, category: "", name: "", quantity: 0, unit: "",
      temp: "", errors: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseAddItem = this.parseAddItem.bind(this);
  }

  parseAddItem(str) {
    let words = str.split(" ");
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
   	  this.setState({ errors: true });
      return;
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(entry) {
      return (entry.trim() != "");
    });

    let quantity = parseFloat(words.shift());
    let unit = words[0];
    let convertedUnit = null;

    if (unit == null || unit.length === 0) {
     this.setState({ errors: true });
     return;
    }

    if (unit[unit.length - 1] == ".") {
    unit = unit.substring(0, unit.length - 1);
    }

    for (let i = 0; i < allMeasurements.length; i++) {
      if (allMeasurements[i].includes(unit)) {
        convertedUnit =
            (quantity === 1 ?
             allMeasurements[i][0] :
             allMeasurements[i][1]);
        break;
      }
    }

    if (convertedUnit != null) {
      words.shift();
    }

    if (words.length == 0) {
     this.setState({ errors: true });
     return;
    }

    if (convertedUnit === null) {
      convertedUnit = "";
    }

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    let item = words.join(" ");

    this.setState({ name: item, quantity: quantity, unit: convertedUnit },
      () => {
        let item = this.state;

        // cross-check with existing items to update if found
        let duplicateItem = findMatchingItem(this.props.groceryItems,
            item.id, item);

        if (duplicateItem != null) {
          let quantity = parseFloat(item.quantity) +
              parseFloat(duplicateItem.quantity);
          let itemUnit = singularizeUnit(duplicateItem.unit);
          if (quantity > 1 && itemUnit !== "") {
            itemUnit = pluralizeUnit(itemUnit);
          }

          let currentQuantityDisplay = quantity;
          if (itemUnit !== "") {
            currentQuantityDisplay += " " + itemUnit;
          }

          let updateDuplicateItem = {
            id: duplicateItem.id,
            name: duplicateItem.name,
            category: duplicateItem.category,
            quantity: quantity,
            unit: itemUnit,
            currentQuantityDisplay: currentQuantityDisplay
          };

          this.props.updateGroceryItem({ grocery_item: updateDuplicateItem });
        } else {
          // add new item
          this.props.createGroceryItem({ grocery_item: item })
              .then(data => this.props.history.push(`/groceries/${data.id}`))
        }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.parseAddItem(this.state.temp);
  }

  update (property) {
    return e => {
      this.setState({ [property]: e.target.value });
    }
  }

  render() {
    return (
      <form className="item-form" onSubmit={ this.handleSubmit }>
        <div className="item-form-fields">
          <TextField id="text-field-default"
            value={ this.state.temp }
            underlineShow={ false }
            style={ addItemStyle }
            hintText="Add an Item,  e.g. '2 Oranges' or '3 cups Milk'"
            hintStyle={ hintTextStyle }
            onChange={ this.update("temp") }
          />

          <select className="form-categories"
            onChange={ this.update("category") }>
            <option selected="true" disabled="disabled">
                Select a Category</option>
            {formCategory.map((category, idx) => {
              return(
                <option key={ idx } value={ category }>{ category }</option>
              )
            })};
          </select>

          <i className="fa fa-plus-circle fa-lg" aria-hidden="true"
          onClick={ this.handleSubmit }></i>
        </div>

        <ErrorBanner shouldShow={ this.state.errors }
            message="Invalid entry. Entry must have 'quantity' and 'item name'" />
      </form>
    );
  }
}

export default GroceryItemForm;
