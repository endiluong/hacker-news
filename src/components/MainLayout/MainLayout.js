import React, { PureComponent } from 'react';
import { PrimaryLayout } from './MainLayout.style';


export default class MainLayout extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <PrimaryLayout>
        {this.props.children}
      </PrimaryLayout>
    );
  }
}
