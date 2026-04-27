import React from 'react';

const WithLogging = (WrappedComponent) => {
  class WithLogging extends React.Component {
    componentDidMount() {
      const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      console.log(`Component ${name} is mounted`);
    }

    componentWillUnmount() {
      const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      console.log(`Component ${name} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLogging.displayName = `WithLogging(${name})`;

  return WithLogging;
};

export default WithLogging;
