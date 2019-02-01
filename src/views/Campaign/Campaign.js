import React, { Component, lazy, Suspense } from 'react';
import NewCampaign from '../NewCampaign/NewCampaign';
import {
  Badge,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CardText,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Progress,
  Row,
  Table,
  Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

class Campaign extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      CampaignList: true,
      CreateCampaign: false,
      receivedCList: [],
      updatedCList:[]
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }


  handleButtonClick()
  {
    window.location.hash = "#/new-campaign";
  }
   
  handleSearch(event){
    var currentCList = this.state.receivedCList;
    currentCList = currentCList.filter(function (item) {
     return item.CampaignName.toLowerCase().search(
     event.target.value.toLowerCase()) !== -1;

      } );
   // var currentCList =[{CampaignId: "C008",CampaignName: "SearchFilter", Channel: "Chat", Status: "Running"},]
    this.setState({ updatedCList: currentCList }); 
}

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
 
  componentDidMount() {
    fetch('http://127.0.0.1:5000/getDetail')
    .then(resp => resp.json())
    .then((resp) => {
     this.setState({
     
       receivedCList: resp.CList,
       updatedCList: resp.CList,
       
     });
   })
  }
  
  render() {

    const {updatedCList,CampaignList} = this.state;
    
    return (
      (CampaignList)?
      <div className="animated fadeIn">
        <div>
          <Row>
            <Col sm="6"><h2>Campaigns</h2></Col>
            <Col sm="4"></Col>
            <Col sm="2"> 
            <Button style={{color:"white", backgroundColor: "black",float:"right"}} onClick={this.handleButtonClick} > &#43;&#160;Campaign</Button>
            </Col>
          </Row>
        </div> <br/>
          <div> 
            <Row> 
              <Col sm="4"> <Label for="exampleSearch">Your Campaigns</Label></Col>
              <Col sm="1">
              <i class="fa fa-search" aria-hidden="true" style={{float:"right"}}></i>
              </Col>
              <Col sm="3">
              <Input type="text" name="search" id="searchcampaign" placeholder="Search Campaigns"  style={{borderBottom:"black"}} onChange={this.handleSearch}/>
              </Col>
              <Col sm="4"> </Col>
            </Row>
          </div>
          <br/>
        
        
        <Row>

          {updatedCList.map((item, index) => (     
            <Col xs="12" sm="6" lg="3">
              <Card >             
                <CardBody>
                  <CardText style={{fontSize:15,fontWeight:"bold"}}>{item.CampaignName}
                  <ButtonGroup className="float-right">
                  <ButtonDropdown  id={item.CampaignId} isOpen={this.state[item.CampaignId]} toggle={() => { this.setState({ [item.CampaignId]: !this.state[item.CampaignId]}); }}>
                  <DropdownToggle >
                  <i class="fa fa-ellipsis-v"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Duplicate</DropdownItem>
                  <DropdownItem>Archive</DropdownItem>
                  </DropdownMenu> 
                  </ButtonDropdown>
                  </ButtonGroup>
                  </CardText>
                  <CardText>{item.Channel}</CardText>
                </CardBody>
                <CardFooter className ={(item.Status)==="Completed"? 'completed':(item.Status)==="Running"?'running': (item.Status)==="Scheduled"?'scheduled':(item.Status)==="Archived"?'archived':'draft' }> {item.Status} </CardFooter>
              </Card>
            </Col>
            
          ))}
        </Row>     
      </div> 
      : 
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
export default Campaign;
