getServiceStatus(function (serivceStatusData) {
  document.getElementById('target').innerHTML = '<div class="row row-cols-1 row-cols-md-3">'
    + serivceStatusData.service_reports.reverse().map(function (serviceReport) {
    var host = serviceReport.host;
    var requestedAt = new Date(serviceReport.requested_at);
    var completedAt = new Date(serviceReport.completed_at);
    var statusCode = serviceReport.status_code;
    var statusText = serviceReport.status_text;
    var nodes = serviceReport.nodes || [];
    var listNodes = 'No nodes available';

    if (nodes.length) {
      listNodes = [
        '<ul class="list-group list-group-flush">',
          nodes.map(function (node) {
            return [
              '<p class="card-text">',
                '<small class="text-muted">Node ' + node.web_node + '</small>',
              '</p>',
              '<p class="card-text">',
                '<small class="status_code_' + node.status_code + ' mr-1">⬤</small>',
                '<small class="text-muted">' + node.status_text + '</small>',
              '</p>',
              '<ul class="list-group list-group-flush">',
                (node.checks || []).map(function (check) {
                  return [
                    '<li class="list-group-item">',
                      '<small style="color: ' + check.state + '" class="mr-1">⬤</small>',
                      check.message,
                      '<p>',
                        '<small class="text-muted"> Started at ' + new Date(check.started_at).toDateString() + ' ' + new Date(check.started_at).toTimeString().split(' ')[0] + '</small>',
                        '<small class="text-muted"> Completed at ' + new Date(check.completed_at).toDateString() + ' ' + new Date(check.completed_at).toTimeString().split(' ')[0] + '</small>',
                      '</p>',
                    '</li>'
                  ].join('');
                }).join(''),
              '</ul>'
            ].join('')
          }).join(''),
        '</ul>'
      ].join('');
    }

    return [
      '<div class="col mb-4" id="host_id_' + host.id + '">',
        '<div class="card" style="width: 22rem;">',
          '<div class="card-body">',
            '<h5 class="card-title">' + host.name + '</h5>',
            '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>',
            '<p class="card-text">',
              '<small class="status_code_' + statusCode + ' mr-1">⬤</small>',
              '<small class="text-muted">' + statusText + '</small>',
            '</p>',
            '<p class="card-text">',
              '<small class="text-muted"> Requested at ' + requestedAt.toDateString() + ' ' + requestedAt.toTimeString().split(' ')[0] + '</small>',
              '<small class="text-muted"> Completed at ' + completedAt.toDateString() + ' ' + completedAt.toTimeString().split(' ')[0] + '</small>',
            '</p>',
            '<p><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#hostModal' + host.id + '">Show more</button></p>',
            '<div class="modal fade" id="hostModal' + host.id + '" tabindex="-1" role="dialog" aria-labelledby="hostModalLabel" aria-hidden="true">',
              '<div class="modal-dialog" role="document">',
                '<div class="modal-content">',
                  '<div class="modal-header">',
                    '<h5 class="modal-title" id="hostModalLabel">' + host.name + '</h5>',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                  '</div>',
                  '<div class="modal-body">' + listNodes + '</div>',
                  '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>',
                '</div>',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('')
  }).join('') + '</div>';
});


function getServiceStatus(callback) {
  var req = new XMLHttpRequest();
  req.addEventListener('load', function reqListener () {
    callback(JSON.parse(this.responseText));
  });
  req.addEventListener('error', function onError () {
    console.warn('Retying...');
    getServiceStatus(callback);
  });
  req.open('GET', 'http://localhost:' + this.location.port + '/service-status');
  req.send();
}
