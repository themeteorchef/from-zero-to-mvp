import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import Datetime from 'react-datetime';

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { meetups } = this.props;
    return (
      <div className="CreateEvent">
        { meetups.length > 0 ? <Row>
          <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } lg={ 6 } lgOffset={ 3 }>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Meetup</ControlLabel>
                  <FormControl componentClass="select" placeholder="Select a meetup...">
                    {meetups.map(({ _id, name }) => (
                      <option key={ _id } value={ _id }>{ name }</option>
                    ))}
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Event Name</ControlLabel>
                  <FormControl
                    type="text"
                    ref={name => (this.name = name)}
                    placeholder="Monthly Talks & Presentations"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Event Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    ref={description => (this.description = description)}
                    placeholder="For this meetup, we'll be discussing..."
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>Event Starts</ControlLabel>
                  <Datetime
                    defaultValue={ moment().format('MMMM Do, YYYY [at] hh:mm a') }
                    dateFormat="MMMM Do, YYYY [at]"
                  />
                </FormGroup>
              </Col>
              <Col xs={ 12 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>Event Ends</ControlLabel>
                  <Datetime
                    defaultValue={ moment().add(1, 'hour').format('MMMM Do, YYYY [at] hh:mm a') }
                    dateFormat="MMMM Do, YYYY [at]"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>Street Address</ControlLabel>
                  <FormControl
                    type="text"
                    ref={location => (this.location = location)}
                  />
                </FormGroup>
              </Col>
              <Col xs={ 12 } sm={ 3 }>
                <FormGroup>
                  <ControlLabel>City</ControlLabel>
                  <FormControl
                    type="text"
                    ref={location => (this.location = location)}
                  />
                </FormGroup>
              </Col>
              <Col xs={ 12 } sm={ 3 }>
                <FormGroup>
                  <ControlLabel>State</ControlLabel>
                  <FormControl
                    type="text"
                    ref={location => (this.location = location)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <Button type="submit" bsStyle="success">Create Event</Button>
              </Col>
            </Row>
          </Col>
        </Row> : <Alert>
          You don't have any meetups yet. <Link to="/meetups/create">Create one</Link>
        </Alert> }
      </div>
    );
  }
}

CreateEvent.propTypes = {
  meetups: React.PropTypes.array,
};
