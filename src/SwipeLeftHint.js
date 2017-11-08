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
        const { visible, image } = this.props;
        const { style } = this.state;
        return (
            <div className='left-hint' style={{ opacity: visible ? 1 : 0, transition: 'opacity 500ms ease-in-out' }}>
                <div className='left-hint-image' style={style}>
                    <img src={image} alt="Left"/>
                </div>
            </div>
        );
    }
}

export default SwipeLeftHint;