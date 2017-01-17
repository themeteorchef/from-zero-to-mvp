import React from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import '../../modules/validation.js';

export default class EditMeetup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { meetup } = this.props;

    const meetupToUpdate = {
      _id: meetup._id,
      name: this.name.value,
      description: this.description.value,
      city: this.city.value,
      state: this.meetupState.value,
    };

    Meteor.call('meetups.update', meetupToUpdate, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        browserHistory.push(`/meetups/${meetup._id}`);
        Bert.alert('Meetup updated!', 'success');
      }
    });
  }

  componentDidMount() {
    const component = this;
    $(component.editMeetupForm).validate({
      rules: {
        name: {
          required: true,
        },
        description: {
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
        name: {
          required: 'What is the name of this meetup?',
        },
        description: {
          required: 'What is this meetup about?',
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
    const { meetup } = this.props;
    return (
      <div className="EditMeetup">
        <form
          ref={editMeetupForm => (this.editMeetupForm = editMeetupForm)}
          onSubmit={submitEvent => submitEvent.preventDefault()}
        >
          <Row>
            <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } lg={ 6 } lgOffset={ 3 }>
              <Row>
                <Col xs={ 12 }>
                  <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <input
                      type="text"
                      ref={name => (this.name = name)}
                      className="form-control"
                      placeholder="Jane's Great Book Bonanza"
                      name="name"
                      defaultValue={ meetup && meetup.name }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <textarea
                      ref={description => (this.description = description)}
                      className="form-control"
                      placeholder="Once a week, we get together and discuss our favorite books."
                      name="description"
                      defaultValue={ meetup && meetup.description }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>City</ControlLabel>
                    <input
                      type="text"
                      ref={city => (this.city = city)}
                      className="form-control"
                      placeholder="New York"
                      name="city"
                      defaultValue={ meetup && meetup.city }
                    />
                  </FormGroup>
                </Col>
                <Col xs={ 12 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>State</ControlLabel>
                    <input
                      type="text"
                      ref={meetupState => (this.meetupState = meetupState)}
                      className="form-control"
                      placeholder="NY"
                      name="state"
                      defaultValue={ meetup && meetup.state }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <Button
                    type="submit"
                    bsStyle="success"
                  >Save Meetup</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

EditMeetup.propTypes = {
  meetup: React.PropTypes.object,
};
