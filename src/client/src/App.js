import React, { Component } from 'react'
import { connect } from 'react-redux'

import AsyncComponent from './common/asyncComponent'
import Header from './components/header'
import Footer from './components/footer'
import {getApiData} from './actions'
import store from './store'

import './style/App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentsData: props.components,
      header: null,
      footer: null
    }
  }

  componentWillMount() {
    // Attempt to load data from data attribute
    if(this.state.componentsData.length === 0) {
      this.props.dispatch(getApiData(this.props.id));
    }
    else {
      this.loadComponents(this.state.componentsData);
    }
  }

  componentWillReceiveProps(newProps) {
    // Dispatch action to change the page with new data if id changes
    if(newProps.id !==  this.props.id) {
      this.props.dispatch(getApiData(this.props.id));
    }
    // If we have recieved new components load them
    if(newProps.components !== this.props.components) {
      this.loadComponents(newProps.components);
    }
    // Update header & footer
    if(newProps.header !== this.props.header) {
      this.setState({
        header: newProps.header
      });
    }
    if(newProps.footer !== this.props.footer) {
      this.setState({
        footer: newProps.footer
      });
    }
  }

  loadComponents(componentsData) {
    this.setState({componentsData});
  }

  dynamicallyLoadComponents() {
    let components = [];
    for (let i=0; i<this.state.componentsData.length;i++ ) {
      let componentData = this.state.componentsData[i];
      let componentType = componentData.module.polymorphic_ctype.model;
      // Use webpack dynamic import to get the module
      let componentImport = () => {
        return import(`./components/${componentType}/index`);
      }
      components.push((<AsyncComponent moduleProvider={componentImport} data={componentData} />));
    }
    return components;
  }

  render() {
    let components = this.dynamicallyLoadComponents();

    return (
      <div>
        <Header data={this.state.header}/>
        {components}
        <Footer data={this.state.footer}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    components: state.components,
    footer: state.footer,
    header: state.header
  })
)(App);
