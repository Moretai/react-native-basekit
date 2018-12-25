import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import LottieLoader from 'react-native-lottie-loader';

class Progress extends React.PureComponent {
  static propTypes = { visible: bool.isRequired };

  render() {
    const { visible } = this.props;

    return <LottieLoader animation={require('../../assets/loading.json')} visible={visible} />; //eslint-disable-line
  }
}

const mapStateToProps = ({ app: { visible } }) => ({ visible });

export default connect(mapStateToProps)(Progress);
