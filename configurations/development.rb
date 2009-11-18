module Nice

  module Configurations

    class Development < Default

      database :adapter => 'sqlite', :database => 'nice'

      reloadable [ Nice ]
      log :level => :debug
      host '127.0.0.1'
      port 2020
      dependencies []

	    application.use Rack::Session::Cookie,
	      :key => 'rack.session',
        # :domain => 'foo.com',
        :path => '/',
        :expire_after => 2592000,
        :secret => 'Change it'

      application.use ::Rack::Static,
       :urls => [ '/css/', '/javascript/', '/favicon.ico' ],
       :root => 'public'

      application.run ::Waves::Dispatchers::Default.new

      server Waves::Servers::Mongrel
    end

  end

end
