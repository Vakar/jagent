import City from "../models/city";
import NoSsr from "@material-ui/core/NoSsr";
import React from "react";
import Select from "react-select";
import { setCity } from "../actions";

class AutocompleteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectInput: null,
    };
  }

  handleChange = (selectInput) => {
    if (selectInput) {
      const { setCity } = this.props;
      const city = new City(selectInput.label, selectInput.value);
      setCity(city);
      this.setState({
        selectInput: selectInput,
      });
    } else {
      setCity(null);
      this.setState({
        selectInput: null,
      });
    }
  };

  cityMapper = (city) => ({
    label: city.name,
    value: city.id,
  });

  render() {
    const { cities } = this.props;
    if (cities) {
      const entries = cities.map(this.cityMapper);
      return (
        <NoSsr>
          <Select
            options={entries}
            value={this.state.selectInput}
            onChange={this.handleChange}
            placeholder="Select city"
            isClearable
          />
        </NoSsr>
      );
    } else {
      return null;
    }
  }
}

export default AutocompleteSelect;
