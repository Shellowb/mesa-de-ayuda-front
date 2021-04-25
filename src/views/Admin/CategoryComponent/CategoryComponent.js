import React, {Component} from 'react';
import CategoryApi from '../../../api/categoryRepository';
import { Typography, Spin, Space, Popconfirm, notification, Input, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

class CategoryComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: null,
      inputVisible: false,
      inputValue: '',
      process: this.props.params.id,
    };
  }

  componentDidMount(){
    CategoryApi.getCategoriesByProcess(this.props.params.id)
      .then(response => {
        this.setState({categories: response})
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente las las categorias'});
    });
  };

  postCategory(){
    CategoryApi.postCategory({name: this.state.inputValue, process: this.state.process})
      .then(response => {
        this.props.componentDidMount();
        this.componentDidMount();
        this.setState({inputVisible: false, inputValue: ''});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente las las categorias'});
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true });
  };

  saveInputRef = input => {
    this.input = input;
  };

  confirmDelete(id) {
    CategoryApi.deleteCategory(id)
      .then(() => {
        this.componentDidMount();
        notification['success']({
          message: 'Excelente!',
          description:
          'Se ha eliminado la categoria'});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'Esta categoria tiene asociado preguntas frecuentes'});
    });
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  render(){
    if(this.state.categories == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }

    return(
      <div>
        <Title level={5}>Categorias</Title>
        {this.state.categories.map((category => {
          return (<Tag 
            color="blue" 
            >
              
              <Space>
              {category.name} 
              <Popconfirm
                placement="topRight"
                title="¿Estas seguro que quieres eliminar esta categoria?"
                onConfirm={() => {this.confirmDelete(category.id)}}
                okText="Si"
                cancelText="No"
              >
                x
              </Popconfirm>
              </Space>
              
            </Tag>);
        }))}
        {this.state.inputVisible && (
          <Input
            style={{width: "78px", marginRight: "8px", verticalAlign: "top"}}
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onBlur={() => this.postCategory()}
            onPressEnter={() => this.postCategory()}
          />
        )}
        {!this.state.inputVisible && (
          <Tag style={{background: "#fff", borderStyle: "dashed"}} onClick={this.showInput}>
            <PlusOutlined /> Nueva categoria
          </Tag>
        )}
      </div>
    );
  }
}

export default CategoryComponent;