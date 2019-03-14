class SSE {
  constructor() {
    // arrays of responses keyed by roomCode
    this.responses = {};
  }

  static sseMiddleware() {
    return function(req, res, next) {
      res.sseHead = function() {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        })
      };

      // Instead of setting event listeners based on event, Observable will view all and set action type from data
      // However, this requires event to be either empty or 'message'
      res.sseSend = function(eventType, data) {
        let stream = `data: ${JSON.stringify({type: eventType, payload: data})} \n\n`;
        res.write(stream);
      };

      next()
    }
  }

  sub(res, key) {
    res.sseHead();
    if (this.responses[key]) {
      this.responses[key].push(res);
    } else {
      this.responses[key] = [res];
    }
  }

  pub(eventType, data, key) {
    if (this.responses[key]) {
      this.responses[key].forEach((res) => {
        res.sseSend(eventType, data);
      });
    } else {
      console.error(new Error("No connections on this session to push to"));
    }
  }
}

module.exports = SSE;
