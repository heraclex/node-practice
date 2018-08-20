import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class MessageModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            message: '',
        };
    }

    setMessage(message) {
        this.setState({
            message: message
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <Modal isOpen={this.state.modal} className={this.props.className}>
                <ModalHeader toggle={this.toggle.bind(this)}>OPP!</ModalHeader>
                <ModalBody> {this.state.message} </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle.bind(this)}>OK</Button>
                </ModalFooter>
            </Modal>
        );
    }
}