import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet, Text} from 'react-native';

const Alert = ({alerts}) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <View key={alert.id} style={styles.alert}>
      <Text>{alert.msg}</Text>
    </View>
  ));

Alert.propTypes = {alerts: PropTypes.array.isRequired};

const mapStateToToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToToProps)(Alert);

const styles = StyleSheet.create({
  alert: {
    padding: 12,
    marginTop: 16,
    opacity: 0.9,
    backgroundColor: 'red',
    color: '#333',
  },
});
