import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync } from './testActions';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { openModal } from '../modals/modalActions';

const mapState = (state) => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
};

class TestComponent extends Component {
  state = {
    latlng: {
      lat: 59,
      lng: 30,
    },
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          latlng: latLng,
        });
      })
      .catch((error) => console.error('Error', error));
  };

  render() {
    const {
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName,
    } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The Answer is: {this.props.data}</h3>
        <Button
          onClick={(e) => incrementAsync(e.target.name)}
          loading={buttonName === 'increment' && loading}
          positive
          content="Increment"
          name="increment"
        />
        <Button
          onClick={(e) => decrementAsync(e.target.name)}
          loading={buttonName === 'decrement' && loading}
          negative
          content="Decrement"
          name="decrement"
        />
        <Button
          onClick={() => openModal('TestModal', { data: 42 })}
          color="teal"
          content="Open Modal"
        />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap
          key={this.state.latlng.lng}
          latlng={this.state.latlng}
        />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
