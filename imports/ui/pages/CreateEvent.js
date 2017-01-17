import React from 'react';
import moment from 'moment';
import { Link, browserHistory } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import '../../modules/validation.js';

export default class CreateEditEvent extends React.Component {
  constructor(props) {
    super(props);
    const initialStartDateTime = moment();
    const initialEndDateTime = moment().add(1, 'hour');
    this.state = { startDateTime: initialStartDateTime, endDateTime: initialEndDateTime };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { event } = this.props;

    const eventToInsert = {
      published: this.published.value === 'yes',
      meetup: this.meetup.value,
      name: this.name.value,
      description: this.description.value,
      startDateTime: moment(this.state.startDateTime).utc().format(),
      endDateTime: moment(this.state.endDateTime).utc().format(),
      location: {
        name: this.location.value,
        address: this.address.value,
        city: this.city.value,
        state: this.eventState.value,
      },
    };

    Meteor.call('events.insert', eventToInsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        browserHistory.push(`/events/${response}`);
        Bert.alert('Event created!', 'success');
      }
    });
  }

  componentDidMount() {
    const component = this;
    $(component.createEventForm).validate({
      rules: {
        published: {
          required: true,
        },
        meetup: {
          required: true,
        },
        name: {
          required: true,
        },
        description: {
          required: true,
        },
        startDateTime: {
          required: true,
        },
        endDateTime: {
          required: true,
        },
        location: {
          required: true,
        },
        address: {
          required: true,
        },
        city: {
          required: true,
        },
        state: {
          required: true,
        },
      },
      messages: {
        published: {
          required: 'Need to know if we should publish this.',
        },
        meetup: {
          required: 'What meetup is this event for?',
        },
        name: {
          required: 'What is the name of this event?',
        },
        description: {
          required: 'What is this event about?',
        },
        startDateTime: {
          required: 'When does the event start?',
        },
        endDateTime: {
          required: 'When does the event end?',
        },
        location: {
          required: 'What is the name of the location?',
        },
        address: {
          required: 'What\'s the address?',
        },
        city: {
          required: 'What city?',
        },
        state: {
          required: 'What state?',
        },
      },
      submitHandler() {
        component.handleSubmit();
      },
    });
  }

  render() {
    const { meetups, event } = this.props;
    return (
      <div className="CreateEvent">
        <form
          ref={createEventForm => (this.createEventForm = createEventForm)}
          onSubmit={submitEvent => submitEvent.preventDefault()}
        >
          { meetups.length > 0 ? <Row>
            <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } lg={ 6 } lgOffset={ 3 }>
              <Row>
                <Col xs={ 12 }>
                  <FormGroup>
                    <ControlLabel>Published</ControlLabel>
                    <select
                      ref={published => (this.published = published)}
                      className="form-control"
                      placeholder="Published?"
                      name="published"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <p className="form-hint">If yes, event will be displayed to the public upon creation.</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <FormGroup>
                    <ControlLabel>Meetup</ControlLabel>
                    <select
                      ref={meetup => (this.meetup = meetup)}
                      className="form-control"
                      placeholder="Select a meetup..."
                      name="meetup"
                    >
                      {meetups.map(({ _id, name }) => (
                        <option key={ _id } value={ _id }>{ name }</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <FormGroup>
                    <ControlLabel>Event Name</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      ref={name => (this.name = name)}
                      placeholder="Monthly Talks &amp; Presentations"
                      name="name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <FormGroup>
                    <ControlLabel>Event Description</ControlLabel>
                    <textarea
                      className="form-control"
                      ref={description => (this.description = description)}
                      placeholder="For this meetup, we'll be discussing..."
                      name="description"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Event Starts</ControlLabel>
                    <Datetime
                      ref={startDateTime => (this.startDateTime = startDateTime)}
                      defaultValue={ this.state.startDateTime }
                      onChange={(startDateTime) => { this.setState({ startDateTime }); }}
                      name="startDateTime"
                    />
                  </FormGroup>
                </Col>
                <Col xs={ 12 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Event Ends</ControlLabel>
                    <Datetime
                      ref={endDateTime => (this.endDateTime = endDateTime)}
                      defaultValue={ this.state.endDateTime }
                      onChange={(endDateTime) => { this.setState({ endDateTime }); }}
                      name="endDateTime"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <FormGroup>
                    <ControlLabel>Location Name</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      ref={location => (this.location = location)}
                      placeholder="Paula's Pizza Palace"
                      defaultValue={ event && event.name }
                      name="location"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Street Address</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      ref={address => (this.address = address)}
                      placeholder="1658 N. Milwaukee"
                      defaultValue={ event && event.location && event.location.address }
                      name="address"
                    />
                  </FormGroup>
                </Col>
                <Col xs={ 12 } sm={ 3 }>
                  <FormGroup>
                    <ControlLabel>City</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      ref={city => (this.city = city)}
                      placeholder="Chicago"
                      defaultValue={ event && event.location && event.location.city }
                      name="city"
                    />
                  </FormGroup>
                </Col>
                <Col xs={ 12 } sm={ 3 }>
                  <FormGroup>
                    <ControlLabel>State</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      ref={eventState => (this.eventState = eventState)}
                      placeholder="IL"
                      defaultValue={ event && event.location && event.location.state }
                      name="state"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <Button
                    type="submit"
                    bsStyle="success"
                  >Create Event</Button>
                </Col>
              </Row>
            </Col>
          </Row> : <Alert>
            You don't have any meetups yet. <Link to="/meetups/create">Create one</Link>
          </Alert> }
        </form>
      </div>
    );
  }
}

CreateEditEvent.propTypes = {
  meetups: React.PropTypes.array,
  event: React.PropTypes.object,
};
