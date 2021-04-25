import React from 'react';  
import {Switch, Route, Redirect} from 'react-router-dom';  
import HomePage from './views/HomePage/HomePage';  
import LoginPage from './views/Login/LoginPage';  
// import SignUpPage from './views/SignUp/SignUpPage';  
import NotAuth from './views/UtilsPage/NotAuth';  
// import NotCreated from './views/UtilsPage/NotCreated';  
import AdminLayout from './views/Admin/AdminLayout/AdminLayout';  
import ProcessAdminPage from './views/Admin/ProcessPage/ProcessAdminPage';  
import ProcessCreatePage from './views/Admin/ProcessPage/ProcessCreatePage';
import ProcessDatailPage from './views/Admin/ProcessPage/ProcessDetailPage';  
import InstanceDatailPage from './views/Admin/InstanceComponent/InstanceDetailPage';  
import HomeLayout from './views/HomePage/HomeLayout/HomeLayout';
import CategoriesMenu from './views/HomePage/CategoriesPage/CategoriesMenu';
import ProcessPublicDatail from './views/HomePage/ProcessDetail/ProcessPublicPage';
import MessageMain from './views/Admin/MessagesComponent/MessageMain';
import MessageDetail from './views/Admin/MessagesComponent/MessageDetail';
import InstancePublicDetailPage from './views/HomePage/InstanceListPublicComponent/InstanceDetail';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    props.menu = rest.menu;
    return localStorage.getItem('token')
    ? <AdminLayout key="Layout"><Component {...props} key={rest.key}/></AdminLayout>
    : <Redirect to='/not-auth' />
  }} />
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (<HomeLayout key="Layout"><Component {...props} key={rest.key}/></HomeLayout>)
  }} />
)

const CategoryRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (<CategoriesMenu><Component {...props} key={rest.key}/></CategoriesMenu>)
  }} />
)
  
export const Routes = () => (  
  <Switch>  
    <PublicRoute key="HomePage" exact path="/" component={HomePage} />  
    <PublicRoute key="HomePage" exact path="/categorias" component={CategoriesMenu} />  
    <CategoryRoute key="HomePage" exact path="/categorias/:id_process" component={ProcessPublicDatail} />  
    <CategoryRoute key="HomePage" exact path="/categorias/:id_process/instancia/:id_instance" component={InstancePublicDetailPage} />  
    <Route key="LoginPage" exact path="/ingresar" component={LoginPage} />  
    <Route key="NotAuth" exact path="/not-auth" component={NotAuth} />  
    <AdminRoute key="ProcessAdminPage" exact menu="/admin/procesos" path="/admin/procesos" component={ProcessAdminPage} />  
    <AdminRoute key="ProcessCreatePage" exact menu="/admin/procesos" path="/admin/procesos/crear" component={ProcessCreatePage} /> 
    <AdminRoute key="ProcessDatailPage" exact menu="/admin/procesos" path="/admin/procesos/:id" component={ProcessDatailPage} /> 
    <AdminRoute key="InstanceDatailPage" exact menu="/admin/procesos" path="/admin/procesos/:id_process/instancia/:id_instance" component={InstanceDatailPage} /> 
    <AdminRoute key="MessagePage" exact menu="/admin/mensajes" path="/admin/mensajes" component={MessageMain} />  
    <AdminRoute key="MessageDatailPage" exact menu="/admin/mensajes" path="/admin/mensajes/:chat_id" component={MessageDetail} />  
  </Switch>  
);