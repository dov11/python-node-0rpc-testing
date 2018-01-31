import zerorpc

class HelloRPC(object):
    def hello(self, name):
        print("here")
        return "Hello, %s" % name
    def bye(self, name):
        print('bye')
        return "Bye, %s" %name

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()