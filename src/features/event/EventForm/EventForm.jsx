import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions.js';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput.jsx';
import TextArea from '../../../app/common/form/TextArea.jsx';
import SelectInput from '../../../app/common/form/SelectInput.jsx';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan} from 'revalidate';
import { DateInput } from '../../../app/common/form/DateInput.jsx';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    initialValues: event
  }

}

const actions = {
  createEvent, 
  updateEvent
};

const validate = combineValidators({
  title: isRequired({message: 'The Event Title is Required'}),
  category: isRequired({message: 'The category is Required'}),
  description: composeValidators(
      isRequired({message: 'please enter a description' }),
      hasLengthGreaterThan(5) ({message: 'Please enter a longer desc more than 5 chars'})
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired({message: 'The date is Required'})
});

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {
  
  onFormSubmit = values => {
    console.log(values);
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`)
    } else {
      const newEvent = {
        ...values, 
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: "Bob"
      }
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`)
      
    }
    
  };

    render() {
      const {history, initialValues, invalid, submitting, pristine} = this.props;
        return (
          <Grid.Column width={10}>
              <Segment>
                <Header sub color='teal' content='Event Details' />
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>
                 <Field name='title' component={TextInput} placeholder='Give your event a name' />
                 <Field name='category' component={SelectInput} options={category} placeholder='What is your event about?' />
                 <Field name='description' component={TextArea} rows={3} placeholder='Tell us about your event' />

                 <Header sub color='teal' content='Event Location Details' />


                 <Field name='city' component={TextInput} placeholder='Event City' />
                 <Field name='venue' component={TextInput} placeholder='Event Venue' />
                 <Field name='date' component={DateInput} dateFormat='dd LLL yyyy h:mm a' showTimeSelect timeFormat='HH:mm' placeholder='Event Date' />
                 
                  <Button disabled={invalid || submitting || pristine} positive type="submit">
                    Submit
                  </Button>
                  <Button type='button' 
                  onClick={initialValues.id ? 
                    () => history.push(`/events/${initialValues.id}`) 
                    : () => history.push(`/events/`) } >Cancel</Button>
                </Form>
              </Segment>
              </Grid.Column>
        )
    }
}

export default connect(mapState, actions)(reduxForm({form: 'eventform', validate}, )(EventForm));
