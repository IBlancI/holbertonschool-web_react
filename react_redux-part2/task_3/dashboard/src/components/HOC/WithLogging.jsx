import { Component } from 'react';

const WithLogging = (WrappedComponent) => {
  class WithLoggingComponent extends Component {
    componentDidMount() {
      const componentName = WrappedComponent.name
        ? WrappedComponent.name
        : 'Component';

    }

    componentWillUnmount() {
      const componentName = WrappedComponent.name
        ? WrappedComponent.name
        : 'Component';

    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${WrappedComponent.name || 'Component'})`;

  return WithLoggingComponent;
};

export default WithLogging;
