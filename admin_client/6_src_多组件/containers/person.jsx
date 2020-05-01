import Person from '../components/person.jsx'
import {connect} from 'react-redux'
import {add_person} from '../redux/actions/person.js'


export default connect(
  state =>({
    person:state.person,
    count:state.number
  }),
  {add_person}
)(Person)



