import React, { Component, lazy, Suspense } from 'react';
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Button, Label, Input
} from 'reactstrap';

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
      <div className="animated fadeIn">
        <div>
          <Row>
            <Col sm="6"><h2>Campaigns</h2></Col>
            <Col sm="4"></Col>
            <Col sm="2"> 
            <Button style={{color:"white", backgroundColor: "black",float:"right", borderRadius:22}} onClick={this.handleButtonClick} > &#43;&#160;Campaign</Button>
            </Col>
          </Row>
        </div> <br/>
          <div> 
            <Row> 
              <Col sm="4"> <Label for="exampleSearch" style={{fontSize:15,paddingTop:10}}>Your Campaigns</Label></Col>
              <Col sm="1">
              <i class="fa fa-search" aria-hidden="true" style={{float:"right",paddingTop:12}}></i>
              </Col>
              <Col sm="2">
              <Input type="text" name="search" className="searchfield" placeholder="Search Campaigns"  onChange={this.handleSearch}/>
              </Col>
              <Col sm="5"> </Col>
            </Row>
          </div>
          <br/>
        
        
        <Row>

          {updatedCList.map((item, index) => (     
            <Col xs="12" sm="6" lg="3">
              <Card >             
                <CardBody>
                  <CardText style={{fontSize:15,fontWeight:"bold"}}>{item.CampaignName}
                  <ButtonGroup className="buttonDropdown">
                  <ButtonDropdown id={item.CampaignId} isOpen={this.state[item.CampaignId]} toggle={() => { this.setState({ [item.CampaignId]: !this.state[item.CampaignId]}); }}>
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
                <CardFooter className ={(item.Status)==="Completed"? 'completed':(item.Status)==="Running"?'running': (item.Status)==="Scheduled"?'scheduled':(item.Status)==="Archived"?'archived':(item.Status)==="Paused"?'paused':'draft' }> {item.Status} </CardFooter>
              </Card>
            </Col>
            
          ))}
        </Row>     
      </div>         
    );
   
  }
}
export default Campaign;
