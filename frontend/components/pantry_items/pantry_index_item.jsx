import React from 'react';
import { Link } from 'react-router-dom';

import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { underlineStyle, underlineFocusStyle, quantityStyle, itemStyleDefault, itemStyleCategory, styles } from './material_ui_styles';

// const selectCategory = ["Baking and Dry Goods", "Beverages", "Bread and Bakery", "Canned and Jarred Goods", "Dairy", "Dried Herbs and Spices", "Frozen Foods", "Fruits and Vegetables", "Meat and Seafood", "Oils and Sauces", "Snacks", "Miscellaneous"]

const teaspoon = ['teaspoon', 'teaspoons', 't', 'tsp'];
const tablespoon = ['tablespoon', 'tablespoons', 'T', 'tbsp'];
const fluidounce = ['fluid ounce', 'fluid ounces', 'fl oz'];
const gill = ['gill', 'gills'];
const cup = ['cup', 'cups', 'c'];
const pint = ['pint', 'pints', 'p', 'pt', 'fl pt'];
const quart = ['quart', 'quarts', 'q', 'qt', 'fl qt'];
const gallon = ['gallon', 'gallons', 'g', 'gal'];
const milliliter = ['milliliter', 'milliliters', 'millilitre', 'millilitres', 'ml', 'cc', 'mL'];
const liter = ['liter', 'liters', 'litre', 'litres', 'L'];
const deciliter = ['deciliter', 'deciliters', 'decilitre', 'decilitres', 'dL'];
const pound = ['pound', 'pounds', 'lb', 'lbs'];
const ounce = ['ounce', 'ounces', 'oz'];
const milligram = ['milligram', 'milligrams', 'milligramme', 'milligrammes', 'mg'];
const gram = ['gram', 'grams', 'gramme', 'grammes', 'g'];
const kilogram = ['kilogram', 'kilograms', 'kilogramme', 'kilogrammes', 'kg', 'kgs'];
const millimeter = ['millimeter', 'millimeters', 'millimetre', 'millimetres', 'mm'];
const centimeter = ['centimeter', 'centimeters', 'centimetre', 'centimetres', 'cm'];
const meter = ['meter', 'meters', 'metre', 'metres', 'm'];
const inch = ['inch', 'inches', 'in'];
const foot = ['foot', 'feet'];

const allMeasurements = [teaspoon, tablespoon, fluidounce, gill, cup,
  pint, quart, gallon, milliliter, liter, deciliter, pound, ounce,
  milligram, gram, kilogram, millimeter, centimeter, meter, inch, foot];


function ErrorBanner1(props) {
  if (props.message != null) {
    return (
      <div className="pantry-item-error">{ props.message }</div>
    );
  } else {
    return null;
  }
}

function ErrorBanner2(props) {
  if (props.message != null) {
    return (
      <div className="pantry-item-error">{ props.message }</div>
    );
  } else {
    return null;
  }
}

class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let pantryItem = this.props.pantryItem;
    this.state = { id: pantryItem.id, user_id: pantryItem.user_id,
      category: pantryItem.category, temp: '', currentQuantity: '', quantityError: '', nameError: '' };

    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.checkError = this.checkError.bind(this);
    this.update = this.update.bind(this);
    this.currentQuantity = this.props.pantryItem.quantity;

    if (pantryItem.unit != null && pantryItem.unit.length !== 0) {
      this.currentQuantity = this.currentQuantity + " " + pantryItem.unit;
    }


  }

  parseUpdateQuantity(str) {
    let words = str.split(' ');
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return "Quantity must begin with a number";
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(el) {
      return (el.trim() !== '');
    });

    let quantity = words.shift();
    let unit = words[0];
    let convertedUnit = null;

    if (unit != null) {
      if (unit[unit.length - 1] == '.') {
        unit = unit.substring(0, unit.length - 1);
      }

      for (let i = 0; i < allMeasurements.length; i++) {
        if (allMeasurements[i].includes(unit)) {
          convertedUnit = (quantity === '1' ? allMeasurements[i][0] : allMeasurements[i][1]);
          break;
        }
      }
    }

    if (convertedUnit === null && unit != null) {
      return "Quantity must have a valid unit";
    }

    this.setState({quantity: parseInt(quantity), unit: convertedUnit,
      temp: '', quantityError: ''}, () => {
        const pantryItem = this.state
        this.props.editPantryItem({pantry_item: pantryItem});
      });

    return null;
  }

  update(property) {
    return e => {
      if (property === 'temp') {
        this.currentQuantity = e.target.value;
      }

      if (property === 'name') {
        if (e.target.value === '') {
          return this.setState({nameError: "Name cannot be blank"});
        } else {
          this.setState({nameError: ''});
        }
      }

      if (property === "category") {
        this.setState({ [property]: e.target.value });
      }

      this.setState({[property]: e.target.value}, () => {
        if (this.state.temp === '') {
          const pantryItem = this.state;
          this.props.editPantryItem({pantry_item: pantryItem});
        } else {
          this.parseUpdateQuantity(this.state.temp);
        }
      });
    }
  }

  checkError() {
    let errorMessage = this.parseUpdateQuantity(this.currentQuantity);
    if (errorMessage != null) {
      this.setState({quantityError: errorMessage});
    }
  }

// put onBlur for name update
  render() {

    const pantryItem = this.props.pantryItem;
    const removePantryItem = this.props.removePantryItem;

    let quantity = pantryItem.quantity;
    if (pantryItem.unit !== null) {
      quantity = quantity + " " + pantryItem.unit;
    }

  

    return (
      <div>
        <div className="update-pantry-form-div">

          <form className="update-pantry-form">
            <TextField id="text-field-default"
              value={ quantity }
              underlineFocusStyle ={underlineFocusStyle}
              underlineStyle={underlineStyle}
              style={quantityStyle}
              onChange={this.update('temp')}
              onBlur={this.checkError}
            />

            {pantryItem.category === '' ?
              <TextField id="text-field-default"
                value={ pantryItem.name }
                underlineFocusStyle ={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleCategory}
                onChange={this.update('name')}
              /> :
              <TextField id="text-field-default"
                value={ pantryItem.name }
                underlineFocusStyle ={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleDefault}
                onChange={this.update('name')}
              />
            }

            {pantryItem.category === '' ?
              <select className="pantry-uncategorized"
                onChange={this.update("category")}>
                <option selected="true" disabled="disabled">Select a Category</option>
                <option value="Baking and Dry Goods">Baking and Dry Goods</option>
                <option value="Beverages">Beverages</option>
                <option value="Bread and Bakery">Bread and Bakery</option>
                <option value="Canned and Jarred Goods">Canned and Jarred Goods</option>
                <option value="Dairy">Dairy</option>
                <option value="Dried Herbs and Spices">Dried Herbs and Spices</option>
                <option value="Frozen Foods">Frozen Foods</option>
                <option value="Fruits and Vegetables">Fruits and Vegetables</option>
                <option value="Meat and Seafood">Meat and Seafood</option>
                <option value="Oils and Sauces">Oils and Sauces</option>
                <option value="Snacks">Snacks</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select> : ''}
          </form>

          <i className="material-icons trash-can"
            style={styles}
            onClick={() => removePantryItem(pantryItem.id)}>
            delete_forever</i>
        </div>

        <ErrorBanner1 message={this.state.quantityError} />
        <ErrorBanner2 message={this.state.nameError} />
      </div>
    );
  }
}

export default PantryIndexItem;

// update property: attempt to update item with category change
// if (property === "category") {
//   this.setState({[property]: e.target.value}, () => {
//     let allItems = this.props.pantryItems;
//
//     for (var i = 0; i < allItems.length; i++) {
//       if (allItems[i].category !== this.state.category) {
//         continue;
//       }
//
//       let itemName = allItems[i].name;
//       if (itemName !== this.props.pantryItem.name) {
//         continue;
//       }
//

//       let itemUnit = allItems[i].unit;
//       if (itemUnit === 'inch' || itemUnit === 'inches') {
//         itemUnit = 'inch';
//       } else if (itemUnit === 'foot' || itemUnit === 'feet') {
//         itemUnit = 'foot';
//       } else if (itemUnit.charAt(itemUnit.length - 1) === 's') {
//         itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
//       }
//

//       let convertedUnit = this.props.pantryItem.unit;
//
//       if (convertedUnit === 'inch' || convertedUnit === 'inches') {
//         convertedUnit = 'inch';
//       } else if (convertedUnit === 'foot' || convertedUnit === 'feet') {
//         convertedUnit = 'foot';
//       } else if (convertedUnit.charAt(convertedUnit.length - 1) === 's') {
//         convertedUnit = convertedUnit.substring(0, (convertedUnit.length - 1));
//       }
//
//       let itemQuantity = parseFloat(this.props.pantryItem.quantity);
//       if (convertedUnit !== itemUnit) {
//         continue;
//       } else {
//         itemQuantity += parseFloat(allItems[i].quantity);
//       }
//
//       if (itemQuantity > 1 && convertedUnit !== '') {
//         if (convertedUnit === 'inch') {
//           convertedUnit = 'inches';
//         } else if (convertedUnit === 'foot') {
//           convertedUnit = 'feet';
//         } else {
//           convertedUnit += 's';
//         }
//       }
//

//
//       let pantryItem = {id: allItems[i].id, name: this.props.pantryItem.name, category: allItems[i].category, quantity: itemQuantity, unit: convertedUnit};
//

//
//       this.props.editPantryItem({pantryItem});
//       return true;
//     }
//   });
// }
