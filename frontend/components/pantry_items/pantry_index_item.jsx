import React from 'react';
import TextField from 'material-ui/TextField';

import { Link } from 'react-router-dom';

const textboxUnderlineStyle = {
  'border-color': '#333399'
}

const addItemTextBoxStyle1 = {
  "font-family": "'Nunito', sans-serif",
  "font-size": "25px",
  "font-weight": "bold",
  "width": "20%",
  "display": "inline",
  "text-align": "left"
}

const addItemTextBoxStyle2 = {
  "font-family": "'Nunito', sans-serif",
  "font-size": "25px",
  "font-weight": "bold",
  "width": "20%",
  "display": "inline"
}

const teaspoon = ['teaspoon', 'teaspoons', 't', 'tsp'];
const tablespoon = ['tablespoon', 'tablespoons', 'T', 'tbl', 'tbs', 'tbsp'];
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
const inch = ['inch', 'inches', 'in', '"'];
const foot = ['foot', 'feet', '\''];

const allMeasurements = [teaspoon, tablespoon, fluidounce, gill, cup,
  pint, quart, gallon, milliliter, liter, deciliter, pound, ounce,
  milligram, gram, kilogram, millimeter, centimeter, meter, inch, foot];


class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props)
    let pantry_item = this.props.pantry_item
    this.state = { name: pantry_item.name, quantity: pantry_item.quantity,
      unit: pantry_item.unit, temp: '' }
  }

  parseAddItem(str) {
    let words = str.split(' ');
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return false;
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(entry) { return entry.trim() != ''; });
    let quantity = words.shift();
    let unit = words[0];
    let convertedUnit = null;

    if (unit == null || unit.length === 0) {
     return false;
    }

    if (unit[unit.length - 1] == '.') {
    unit = unit.substring(0, unit.length - 1);
    }

    for (let i = 0; i < allMeasurements.length; i++) {
      if (allMeasurements[i].includes(unit)) {
        convertedUnit = (quantity === '1' ? allMeasurements[i][0] : allMeasurements[i][1]);
        break;
      }
    }

    if (convertedUnit != null) {
      words.shift();
    }

    if (words.length == 0) {
     return false;
    }

    if (convertedUnit === null) {
      convertedUnit = '';
    }

  this.setState({quantity: parseInt(quantity), unit: convertedUnit, temp: ''}, () => {
      const pantry_item = this.state
      this.props.editPantryItem({pantry_item})
          .then(data => this.props.history.push(`/pantry_items/${data.id}`))
      });

    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.temp === '') {
      const pantry_item = this.state;
      this.props.editPantryItem({pantry_item})
        .then(data => this.props.history.push(`/pantry_items/${data.id}`));
    } else {
      this.parseAddItem(this.state.temp);
    }
  }

  update (property) {
    return e => this.setState({[property]: e.target.value});
  }


  render() {
    const pantry_item = this.props.pantry_item;
    const deletePantryItem = this.props.deletePantryItem;
    let quantity = this.state.quantity;
    if (this.state.unit !== null) {
      quantity = quantity + " " + this.state.unit;
    }

    return (
      <div>
        <form className="update-pantry-form" onSubmit={this.handleSubmit}>
          <div className="update-pantry-col1">
            <TextField id="text-field-default"
              value={ quantity }
              underlineFocusStyle ={textboxUnderlineStyle}
              style={addItemTextBoxStyle1}
              onChange={this.update('temp')}
            />
          </div>
          <div className="update-pantry-col2">
            <TextField id="text-field-default"
              value={ this.state.name }
              underlineFocusStyle ={textboxUnderlineStyle}
              style={addItemTextBoxStyle2}
              onChange={this.update('name')}
            />
          </div>
        </form>

        <button className="pantry-button"
          onClick={ () => {deletePantryItem(pantry_item.id)} }>
          Delete
        </button>
      </div>
    );
  }
}

export default PantryIndexItem;

// onChange={this.handleChange}
// <Link to={`/pantry_items/${pantry_item.id}`}></Link>
// <button className="pantry-button"
//   onClick={ () => {editPantryItem(pantry_item.id)} }>
//   Update Pantry Item
// </button>
//
// handleSubmit(event) {
//   event.preventDefault();
//   const pantry_item = this.state;
//   this.props.editPantryItem({pantry_item})
//   .then(data => this.props.history.push(`/pantry_items/${data.id}`));
// }
