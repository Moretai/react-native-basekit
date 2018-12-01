import React from 'react';
import { bool } from 'prop-types';
import { StyleSheet, View, Modal } from 'react-native';
import { connect } from 'react-redux';
import LottieAnimation from 'lottie-react-native';
import Constants from '../../constants';

const styles = StyleSheet.create({
  animationStyle: {
    alignSelf: 'center',
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 30,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 30,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.TRANSLUCENT,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 0,
  },
});

class Spinner extends React.PureComponent {
  static propTypes = { isLoading: bool.isRequired };
  animationRef = React.createRef();

  componentDidMount() {
    if (this.animationRef.current) {
      this.animationRef.current.play();
    }
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;

    if (prevProps.isLoading !== isLoading) {
      if (this.animationRef.current) {
        this.animationRef.current.play();
      }
    }
  }

  render() {
    const { isLoading } = this.props;

    return (
      <Modal visible={isLoading} animationType="none" supportedOrientations={['portrait']} transparent>
        <View style={styles.container}>
          <LottieAnimation
            ref={this.animationRef}
            style={styles.animationStyle}
            loop
            source={require('../../assets/loading.json')} //eslint-disable-line
          />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = ({ app: { isLoading } }) => ({ isLoading });

export default connect(mapStateToProps)(Spinner);
