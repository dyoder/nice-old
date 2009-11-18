module Nice
  module Resources
    class Map
      include Waves::Resources::Mixin
      on( true ) { view(:default).home }
    end
  end
end