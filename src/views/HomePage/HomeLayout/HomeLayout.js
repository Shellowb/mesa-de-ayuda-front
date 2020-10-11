import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './HomeLayout.css';
import { Layout, PageHeader } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

class HomeLayout extends Component {

  handleClick = e => {
    this.props.children.props.history.push(e.key);
  };

  render(){
    return (
      <Layout key="layout" style={{minHeight: '100vh'}}>
        <PageHeader
            className="site-page-header"
            title="Mesa de Ayuda DCC"
            extra={[
              <FontAwesomeIcon icon={faEnvelopeSquare} size="2x"/>,
            ]}
        />

        {this.props.children}
      </Layout>
    );
  }
}

export default HomeLayout;
