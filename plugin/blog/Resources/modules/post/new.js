/**
 * Created by david on 13/10/16.
 */
import 'jquery-ui/ui/minified/position.min.js'
import 'jquery-ui/ui/minified/menu.min.js'
import 'jquery-ui/ui/minified/autocomplete.min.js'
import 'tag-it/js/tag-it.min.js'

import $ from 'jquery'

$(function() {
  $('.tags').tagit({
    'availableTags' : ['{{ blog_tags(_resource)|tagnames|join("', '")|raw }}'],
    'allowSpaces' : true
  })
})