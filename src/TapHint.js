import React, {Component} from 'react';
import './TapHint.css';

class TapHint extends Component {

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
        console.log('Tap onAction()');
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
        const { visible, image, text } = this.props;
        const { style } = this.state;
        return (
            <div className='tap-hint' style={{ opacity: visible ? 1 : 0, transition: 'opacity 500ms ease-in-out' }}>
                <div className='tap-hint-image' style={style}>
                    {text ? <div>{text}</div> : <img src={image} alt="Tap"/>}
                </div>
            </div>
        );
    }
}

export default TapHint;