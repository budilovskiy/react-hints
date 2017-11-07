import React, {Component} from 'react';
import './SwipeLeftHint.css';

class SwipeLeftHint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {}
        };
        this.timeout = undefined;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    onAction() {
        console.log('Swipe left onAction()');
        this.setState({style: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.1) translateY(-40%)',
            transition: 'all 250ms ease'
        }});
        this.timeout = setTimeout(() => {
            this.setState({style: {
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                transform: 'scale(1.0) translateY(-45%)',
                transition: 'all 250ms ease'
            }});
        }, 250);
    }

    render() {
        if (this.props.visible) {
            return (
                <div className='left-hint'>
                    <div className='left-hint-image' style={this.state.style}>
                        <img src={this.props.image} alt="Left"/>
                    </div>
                </div>
            );
        } else {
            return (
                <div/>
            )
        }
    }
}

export default SwipeLeftHint;