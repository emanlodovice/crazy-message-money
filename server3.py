import json
import tornado.ioloop
import tornado.web
import tornado.websocket


class SocketHandler(tornado.websocket.WebSocketHandler):
    clients = []

    def open(self):
        print 'ws:open'
        SocketHandler.clients.append(self)
        self.write_message(
            {"intent": "hello"})

    def on_message(self, message):
        print "ws%s:rcv:%s" % (self, message)
        msg = json.loads(message)

        # send message to clients
        for c in SocketHandler.clients:
            if c != self:
                c.write_message(msg)

    def on_close(self):
        print 'ws:close'
        SocketHandler.clients.remove(self)


class Main(tornado.web.RequestHandler):
    def get(self):
        self.render('desktop.html')


application = tornado.web.Application([
    (r"/", Main),
    (r"/websocket", SocketHandler),
    (r'/(.*)', tornado.web.StaticFileHandler, {'path': 'static/'}),
], debug=True)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
