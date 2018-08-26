import React from "react";
import Dropzone from "react-dropzone";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import userService from "../services/user.service";
export default class UserAvata extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: true,
            avatarUrl: '',
            isReady: false
        };
        this.onDrop = this.onDrop.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        let self = this;
        // try to resolve the url 
        imageExists(this.props.avatarUrl).then(function (img) {
            if (img.status === 'ok') {
                self.setState({ avatarUrl: img.avatarUrl });
            }
            setTimeout(() => {
                self.setState({ isReady: true });
            }, 400);
        });
    }

    onDrop(acceptedFiles, rejectedFiles) {
        userService.uploadAvatar(this.props.username, acceptedFiles[0]).then((response) => {
            if (response) {
                // TODO: notify to users in app for the update of userAvatar, other while, it will ask to upload image again
                this.setState({ avatarUrl: userService.baseUrl + "/" + response.avatarUrl });
            }
        });
    }

    toggle() {
        this.props.onDismiss();
    }

    render() {
        return (
            <Popover placement='right' isOpen={this.state.popoverOpen} target={this.props.target} toggle={this.toggle()}>
                <PopoverHeader>{this.props.username}</PopoverHeader>
                <PopoverBody >
                    {
                        this.state.isReady
                            ?
                            <div>
                                <img style={{ display: this.state.avatarUrl ? 'block' : 'none' }}
                                    src={this.state.avatarUrl} className="img-fluid rounded " alt="..." />
                                <Dropzone style={{ display: !this.state.avatarUrl ? '' : 'none' }}
                                    onDrop={(files) => this.onDrop(files)} >
                                    <div>Drop or click to select your avatar to upload.</div>
                                </Dropzone>
                            </div>
                            :
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                    aria-valuemax="100" style={{ width: '100%' }}></div>
                            </div>
                    }
                </PopoverBody>
            </Popover>
        )
    }
}

function imageExists(avatarUrl) {
    return new Promise(resolve => {
        avatarUrl = userService.baseUrl + "/" + avatarUrl;
        const img = new Image();
        img.src = avatarUrl;
        img.onload = () => resolve({ avatarUrl: avatarUrl, status: 'ok' });
        img.onerror = () => resolve({ avatarUrl: avatarUrl, status: 'error' });
    });
}





