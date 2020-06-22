import instance from './instance'
import { convertRESTAPI } from '{{$$.relative("util")}}'

<% _.forEach(data.mocks, function(mock){ %>/** {{mock.description}} */
function {{$$.toCamelMethod($$.convertMethod(mock))}} (opts) {
  return instance({
    method: '{{mock.method}}',
    url: '{{mock.url}}',
    opts: opts
  })
}

<%}) %>
export {<% _.forEach(data.mocks, function(mock, i){ %>
  {{$$.toCamelMethod($$.convertMethod(mock))}}<% if(data.mocks.length - 1 !== i) { %>,<% } %><% }) %>
}
