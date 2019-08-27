import React, { PureComponent } from 'react';
import {  View, Text, Dimensions} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit'
import moment from 'moment';
import _ from 'lodash';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: '#FFFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `#000`,
  strokeWidth: 2, // optional, default 3
  marginBottom: 40,
}

class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentWillMount () {

  }

  render() {
    const { pressures, mode } = this.props;
    const data = {
      labels: pressures.map(a => moment(a.created_at).format('Do')),
      datasets: [{
        data: pressures.map(a => { 
          if (mode === 'pulse') {
            return a.pulse
          } else if (mode === 'dia') {
            return a.dia
          } else {
            return a.sys

          }
        }),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }]
    }
    console.log(data)

    return (
    
      <View>
        {!_.isEmpty(data.datasets[0].data) && (
          <LineChart
            data={data}
            width={screenWidth - 20}
            height={220}
            chartConfig={chartConfig}
            bezier
          />

        )}
      </View>
    );
  }
}

export default Chart;
