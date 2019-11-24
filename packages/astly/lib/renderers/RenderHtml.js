import React from "react";
import { ThemeProvider } from "styled-components";
import { isNative } from "../helpers";
import defaultComponentMap from "../maps";
import Box from "../components/Box";
import { parseHtml } from "../parsers";

class RenderHtml extends React.Component {
  static defaultProps = {
    componentMap: defaultComponentMap,
    inspectNewChildren: children => children,
    theme: {}
  };
  state = {
    components: null
  };

  componentDidMount() {
    const { html, componentMap, ...props } = this.props;
    if (!html) {
      throw new Error("No html");
    }
    parseHtml({ components: componentMap, ...props }).process(
      html,
      (err, file) => {
        if (err) {
          console.log("Error", err);
        } else {
          this.setState(prevState => ({ ...prevState, components: file }));
        }
      }
    );
  }

  renderNewChildren = () => {
    const { inspectNewChildren, ...props } = this.props;
    if (this.state.components === null) {
      return null;
    }
    return isNative
      ? React.createElement(Box, props, [
          this.state.components.contents.props.children
        ])
      : React.createElement(Box, props, [this.state.components.contents]);
  };

  render() {
    const { inspectNewChildren, ...props } = this.props;

    return (
      <React.Fragment>
        <ThemeProvider theme={this.props.theme}>
          {inspectNewChildren(this.renderNewChildren())}
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default RenderHtml;