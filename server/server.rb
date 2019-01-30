require 'sinatra/base'

class Server < Sinatra::Base
  get '/' do
    'Hello world!'
  end
end
