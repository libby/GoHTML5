package controllers

import play._
import play.mvc._
import templates.Template

object Application extends Controller {
    
    import views.Application._
    
    def index = {
        html.index("Your Scala application is ready!")
    }

    def ctest = {
         Template
    }

      def grid = {
         Template
    }
    
}
