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

class HomePage extends React.Component {
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
   handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Axios.post('form-kayit', this.state).then((response)=> {
          notification['success']({
            duration: 15,
            message: "Tebrikler!",
            description: "Kayıt Başarılı. Mutlaka görüşmek dileği ile.. Hoşçakalın",
          });
        }, (error)=> {
          notification['error']({
            duration: 15,
            message: "Hata!",
            description: "Malesef bir sorun oluştu. Lütfen daha sonra tekrar kayıt formunu doldurmayı deneyiniz..",
          });
        })
      }
    });
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
        <h1 style={{textAlign: 'center'}}>Hoşgeldiniz Sayın Hıdıroğulları!</h1>
        <Card style={{textAlign: 'center', marginTop: '25px'}} title="Tanışma Formu" bordered={false}>
          <Form onSubmit={this.handleSubmit} className="kayit-form" style={{fontSize: '17px'}} >
            <Form.Item {...formItemLayout} label="İsim">
              {getFieldDecorator('isim', {
                  initialValue: this.state.isim,
                  rules: [{ required: true, message: 'Bu kısmı doldurmanız gerekmektedir.' }],
                })(
                  <Input onChange={(e) => {this.setState({isim: e.target.value})}} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Soyisim">
              {getFieldDecorator('soyisim', {
                  initialValue: this.state.soyisim,
                  rules: [{ required: true, message: 'Bu kısmı doldurmanız gerekmektedir.' }],
                })(
                  <Input onChange={(e) => {this.setState({soyisim: e.target.value})}} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Yaş">
              {getFieldDecorator('yas', {
                  initialValue: this.state.yas,
                  rules: [{ required: true, message: 'Bu kısmı doldurmanız gerekmektedir.' }],
                })(
                  <Input onChange={(e) => {this.setState({yas: e.target.value})}} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="E-Posta">
              {getFieldDecorator('email', {
                  initialValue: this.state.email,
                  rules: [{ required: false, message: 'Bu kısmı doldurmanız gerekmektedir.' }],
                })(
                  <Input type="email" onChange={(e) => {this.setState({email: e.target.value})}} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Telefon">
              {getFieldDecorator('telefon', {
                  initialValue: this.state.telefon,
                  rules: [{ required: true, message: 'Bu kısmı doldurmanız gerekmektedir.' }],
                })(
                  <Input onChange={(e) => {this.setState({telefon: e.target.value})}} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Meslek">
              {getFieldDecorator('meslek', {
                  initialValue: this.state.meslek,
                  rules: [{ required: false, message: 'Bu kısmı doldurmanız gerekmektedir.' }],
                })(
                  <Input onChange={(e) => {this.setState({meslek: e.target.value})}} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Adres">
              {getFieldDecorator('adres', {
                  initialValue: this.state.adres,
                  rules: [{ required: false, message: 'Bu kısmı doldurmanız gerekmektedir.' }],
                })(
                  <TextArea rows={4} onChange={(e) => {this.setState({adres: e.target.value})}} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} style={{marginTop: '15px'}}>
              <Button style={{float: 'right'}} type="danger" htmlType="submit" className="login-form-button">
                Temizle
              </Button>
              <Button style={{marginRight: '10px', float: 'right'}} type="primary" htmlType="submit" className="login-form-button">
                Kayıt Et
              </Button>
          </Form.Item>
          </Form>
        </Card>
      </Content>
    );
  }
}

HomePage = createForm()(HomePage);
export default HomePage;
