/**
 * Created by david on 13/10/16.
 */
import $ from 'jquery'
import 'moment'
import 'jquery-ui/ui/minified/core.min.js'
import 'jquery-ui/ui/minified/widget.min.js'
import 'jquery-ui/ui/minified/button.min.js'
import 'jquery-ui/ui/minified/spinner.min.js'
import 'confirm-bootstrap/confirm-bootstrap.js'
//import 'fullcalendar/dist/fullcalendar.js'

(function($) {
  $.fn.tree = function()
  {
    return this.each(function()
    {
      var tree = $(this)

      $(' > ul', tree).attr('role', 'tree').find('ul').attr('role', 'group')

      var treeItem = tree.find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem')
      var treeItemTrigger = treeItem.find(' > span').attr('title', 'Collapse this year').prepend('<i class="fa fa-folder"></i> ')

      treeItem.find(' > ul > li').hide()

      treeItemTrigger.on('click', function (event) {
        var children = $(this).parent('li.parent_li').find(' > ul > li')
        if (children.is(':visible')) {
          children.hide('fast')
          $(this).attr('title', 'Expand this year').find(' > i').addClass('fa-folder').removeClass('fa-folder-open')
        }
        else {
          children.show('fast')
          $(this).attr('title', 'Collapse this year').find(' > i').addClass('fa-folder-open').removeClass('fa-folder')
        }
        event.stopPropagation()
      })
    })
  }
  
  $(document).ready(function() {
    $('.delete').confirmModal()
    $('.tree').tree()

    /*function t(key) {
      return window.Translator.trans(key, {}, 'agenda')
    }

    $('#calendar').fullCalendar({
      editable:        false,
      events:          window.blogEventsPath,
      buttonText: {
        today: t('today')
      },
      monthNames: [t('january'), t('february'), t('mars'), t('april'), t('may'), t('june'), t('july'),
        t('august'), t('september'), t('october'), t('november'), t('december')],
      monthNamesShort: [t('jan'), t('feb'), t('mars'), t('apr'), t('may'), t('ju'), t('jul'), t('aug'),
        t('sept'), t('nov'), t('dec')],
      dayNames: [ t('sunday'),t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday')],
      dayNamesShort: [ t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')],
      today: t('today')
    })*/
  })
})($)