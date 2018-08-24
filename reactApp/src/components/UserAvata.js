import React from "react";
import Dropzone from "react-dropzone";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import userService from "../services/user.service";
export default class UserAvata extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            avatarUrl: null
        };
        this.toggle = this.toggle.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.setAvatarUrl = this.setAvatarUrl.bind(this);
    }

    setAvatarUrl(url) {
        if (url && !this.state.avatarUrl) {
            let self = this;
            // try to resolve the url 
            imageExists(url).then(function (img) {
                if (img.status === 'ok') {
                    self.setState({ avatarUrl: img.avatarUrl });
                }
                else {
                    self.setState({ avatarUrl: null });
                }
            });
        }
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    onDrop(acceptedFiles, rejectedFiles) {
        userService.uploadAvatar(this.props.username, acceptedFiles[0]).then((response) => {
            if (response) {
                this.setState({ avatarUrl: userService.baseUrl + "/" + response.avatarUrl });
            }
        });
    }

    render() {
        return (
            <Popover placement='left' isOpen={this.state.popoverOpen} target={this.props.target} toggle={this.toggle}>
                <PopoverHeader>{this.props.username}</PopoverHeader>
                <PopoverBody>
                    <img style={{ display: this.state.avatarUrl ? 'block' : 'none' }}
                        src={this.state.avatarUrl} className="img-fluid rounded " alt="..." />
                    <Dropzone style={{ display: !this.state.avatarUrl ? '' : 'none' }}
                        onDrop={(files) => this.onDrop(files)} >
                        <div>Drop or click to select your avatar to upload.</div>
                    </Dropzone>
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





