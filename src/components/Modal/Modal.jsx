import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
const root = document.querySelector('#root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          {/* {console.log('src:', this.props.src, 'alt:', this.props.alt)}
          {this.props.src && this.props.alt && (
            <img
              className={styles.modalImg}
              src={this.props.src}
              alt={this.props.alt}
            /> */}
          {this.props.children}
        </div>
      </div>,
      root
    );
  }
}

Modal.propTypes = {
  // src: PropTypes.string.isRequired,
  // alt: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
