import React from 'react';
import moment from 'moment';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { SingleDatePicker } from 'react-dates';

export default class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    const initialEventDate = event.date;
    this.state = { eventDate: moment(initialEventDate), eventDateFocused: false };
  }

  render() {
    const { event } = this.props;
    return (
      <div className="EditEvent">
        <Row>
          <Col xs={ 12 } sm={ 6 }>
            <FormGroup>
              <ControlLabel>Event Name</ControlLabel>
              <FormControl
                type="text"
                ref={name => (this.name = name)}
                defaultValue={ event.name }
              />
            </FormGroup>
          </Col>
          <Col xs={ 12 } sm={ 6 }>
            <FormGroup>
              <ControlLabel>Event Date</ControlLabel>
              <SingleDatePicker
                className="form-control"
                date={this.state.eventDate}
                focused={this.state.eventDateFocused}
                onDateChange={(eventDate) => { this.setState({ eventDate }); }}
                onFocusChange={({ eventDateFocused }) => { this.setState({ eventDateFocused }); }}
                numberOfMonths={ 1 }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 }>
            <FormGroup>
              <ControlLabel>Event Location</ControlLabel>
              <FormControl
                type="text"
                ref={location => (this.location = location)}
                defaultValue={ event.location }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 }>
            <FormGroup>
              <ControlLabel>Event Description</ControlLabel>
              <FormControl
                type="textarea"
                ref={description => (this.description = description)}
                defaultValue={ event.description }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 }>
            <Button type="submit" bsStyle="success">Save Event</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

EditEvent.propTypes = {
  event: React.PropTypes.object,
};
