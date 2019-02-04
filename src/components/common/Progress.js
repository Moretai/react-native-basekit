import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import LottieLoader from 'react-native-lottie-loader';
import { CommonStyles } from '../../styles';

class Progress extends React.PureComponent {
  static propTypes = { visible: bool.isRequired };

  render() {
    const { visible } = this.props;

    return (
      <LottieLoader
        animation={require("../../assets/loader.json")} //eslint-disable-line
        visible={visible}
        animationStyle={CommonStyles.animationStyle}
      />
    );
  }
}

const mapStateToProps = ({ app: { visible } }) => ({ visible });

export default connect(mapStateToProps)(Progress);
