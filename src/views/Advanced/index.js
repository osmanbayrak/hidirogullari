import './index.css';
import React from 'react';
import { Input, Form } from 'antd';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { Form, Input } from 'antd';
// import i18n from '../../i18n';

class Advance extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  Graphs(id, state) {
    this.props.getGraphs(id, state);
  }

  render() {
    return (
      <Form>
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
    );
  }
}

export default Advance;
