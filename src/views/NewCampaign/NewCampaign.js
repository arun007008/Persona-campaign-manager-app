import React, { Component, lazy, Suspense } from 'react';
import {
  Badge,
  Button, Form, FormGroup, Label, Input,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

class NewCampaign extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
      <Col xs="12" sm="6" lg="3"><h2> New Campaign</h2></Col>
      </Row>
      <Form>
        <FormGroup row>
          <Label for="campaignName" sm={2}>Campaign Name</Label>
          <Col sm={4}>
            <Input type="text" name="cName" id="campaignName"  />
          </Col>
          <Col sm={6}></Col>
        </FormGroup>
        <FormGroup row>
          <Label for="channel" sm={2}>Channel</Label>
          <Col sm={4}>
            <Input type="select" name="channel" id="channel" >
            <option>Email</option>
            <option>SMS</option>
            <option>Phone</option>
            <option>Chat</option>
            </Input>
          </Col>
          <Col sm={6}></Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default NewCampaign;