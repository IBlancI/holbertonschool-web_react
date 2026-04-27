import { Component } from 'react';

const WithLogging = (WrappedComponent) => {
  class WithLoggingComponent extends Component {
    componentDidMount() {
      const name = WrappedComponent.name
        ? WrappedComponent.name
        : 'Component';
      console.log(`Component ${name} is mounted`);
    }

    componentWillUnmount() {
      const name = WrappedComponent.name
        ? WrappedComponent.name
        : 'Component';
      console.log(`Component ${name} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${WrappedComponent.name || 'Component'})`;

  return WithLoggingComponent;
};

export default WithLogging;
