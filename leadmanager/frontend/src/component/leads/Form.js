import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addLead } from '../../actions/leads';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addLead({
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    });
    this.setState({
      name: '',
      email: '',
      message: '',
    });
  };

  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="message"
              name="message"
              onChange={this.onChange}
              value={this.state.message}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  addLead: PropTypes.func.isRequired,
};

export default connect(null, { addLead })(Form);
