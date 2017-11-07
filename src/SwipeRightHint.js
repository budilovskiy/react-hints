import React, {Component} from 'react';
import './SwipeRightHint.css';

class SwipeRightHint extends Component {

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
        console.log('Swipe right onAction()');
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

    renderHint() {
        return (
            <div className='right-hint'>
                <div className='right-hint-image' style={this.state.style}>
                    <img src={this.props.image} alt="Right"/>
                </div>
            </div>
        );
    }

    render() {
        return this.props.visible ? this.renderHint() : false;
    }
}

export default SwipeRightHint;