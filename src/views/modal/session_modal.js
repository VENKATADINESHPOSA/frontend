import React, { Component } from 'react'
//import {OrderHistory} from '../OrderHistory/index';
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Modal,ButtonToolbar} from 'reactstrap';
export class SessionModalData extends Component {
    constructor(props){
        super(props)
        this.state = {
             name:'John',
            showModal: false,
        }
    }

    show() {
    this.setState({
      showModal: true,
    })
  }
  hide() {
    this.setState({
      showModal: true,
    })
  }
    
    render(){
        return (
             <div>
                 <Modal
                 show={this.state.showModal}
                 container={this.props.container}
                    >
                  //<div className="modal__header">
                    //<button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.Successtoggle} />
                   
                   
                  //</div>
                  <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15}}>
                    <span className="fa fa-thumbs-up modal__title-icon" style={{color: 'rgb(0, 97, 159)', paddingBottom: 10, fontSize:20}} />
                    <h4 style={{fontSize: 18}}>Successfully Order Placed</h4>
                  </div>
                  <ButtonToolbar className="modal__footer" style={{marginTop: 0}}>
                    <Button style={{backgroundColor: 'rgb(0, 97, 159)', color: '#fff', width: 100}} className="modal_ok"  onClick={this.processData}>Ok</Button>
                  </ButtonToolbar>
                </Modal>
             </div>
        );
    }
}