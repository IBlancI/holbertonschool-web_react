import React, { Component } from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function WithLogging(WrappedComponent) {
  const wrappedName = getDisplayName(WrappedComponent);

  class WithLoggingComponent extends Component {
    componentDidMount() {
      console.log(`Component ${wrappedName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${wrappedName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${wrappedName})`;

  return WithLoggingComponent;
}

export default WithLogging;