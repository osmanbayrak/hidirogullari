import './index.css';
import React from 'react';
import { Input, Form, notification, Button, Card } from 'antd';
import Content from '../../components/Content'
import Axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
const createForm = Form.create;
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import i18n from '../../i18n';

class Advance extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       isim: "",
       soyisim: "",
       telefon: "",
       email: "",
       yas: "",
       meslek: "",
       adres: "",
       tarih: new Date()
     };
   }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Content>
        Sayfayı yenileyin!
      </Content>
    );
  }
}

Advance = createForm()(Advance);
export default Advance;
