import Count from '../components/count.jsx'
import {connect} from 'react-redux'
import {increment , decrement ,incrementAsync} from '../redux/actions/count.js'


// function mapStateToProps(state){
//   return {count:state}
// }

// function mapDispatchToProps(dispatch){
//   return {
//     increment:(value) => {dispatch(increment(value))},
//     decrement:(value) => {dispatch(decrement(value))}  
//   }
// }



// export default connect(mapStateToProps,mapDispatchToProps)(Count)

//简化

export default connect(
  state =>({
    count:state.number,
    person:state.person.length
  }),
  {increment,decrement,incrementAsync}
)(Count)


