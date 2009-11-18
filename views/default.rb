require 'hoshi'

# todo - should use transitional but hoshi does not yet 
# do anything for html_transitional

class Nice::Views::Default < Hoshi::View[ :html4 ]
  
  include Waves::Helpers::Basic

  def initialize( request )
    @request = request
    super()
  end
  
  def home
    html {
      head {
        script( :lang => 'javascript', :src => 'http://base2.googlecode.com/svn/trunk/lib/base2-jsb-fp.js' )
        script( :lang => 'javascript', :src => "/javascript/application.js" )
      }
      body {}
    }
  end
  
end
