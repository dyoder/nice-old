module Nice

  module Configurations

    class Production < Default

      database :host => 'localhost', :adapter => 'mysql', :database => 'nice',
        :user => 'root', :password => ''

      reloadable []

      log :level => :error,
        :output => ( :log / "waves.#{$$}" ),
        :rotation => :weekly

      host '0.0.0.0'

      port 80

      application.use Rack::Session::Cookie,
	    :key => 'rack.session',
        # :domain => 'foo.com',
        :path => '/',
        :expire_after => 2592000,
        :secret => 'Change it'
      application.use ::Rack::Static,
       :urls => [ '/css/', '/javascript/', '/favicon.ico' ],
       :root => 'public'

      server Waves::Servers::Mongrel

    end
  end
end
