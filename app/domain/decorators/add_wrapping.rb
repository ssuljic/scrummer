module Domain
  module Decorators
    class AddWrapping
      def initialize content, user
        @content = content
        @projects = user.projects.map {|p| p.name}
      end

      def decorate
        {
          content: @content,
          projects: @projects
        }
      end
    end
  end
end