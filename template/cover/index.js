import axios from './instance'

<% _.forEach(data.mocks, function(mock){ %>/** {{mock.description}} */
function {{$$.toCamelMethod($$.convertMethod(mock))}} (opts) {
  return axios.{{mock.method}}('{{mock.url}}', opts)
}

<%}) %>
export {<% _.forEach(data.mocks, function(mock, i){ %>
  {{$$.toCamelMethod($$.convertMethod(mock))}}<% if(data.mocks.length - 1 !== i) { %>,<% } %><% }) %>
}
