/**
 * Created by david on 13/10/16.
 */
import $ from 'jquery'

$(document).ready(function() {
  'use strict'
  //Activate inline comment edit
  $('ul.comment_list').on('click', 'a.cancel-update-comment-btn',function (event) {
    var commentElt = $(this).parents('div.blog-comment')
    commentElt.find('.blog-comment-body').show()
    commentElt.find('.blog-comment-body-edit').hide()
    event.preventDefault()
  })
  $('a.edit-comment-btn').each(function(){
    var newLink = $(this)
    newLink.attr('data-path', newLink.attr('href'))
    newLink.attr('href', '#comment-body-'+newLink.attr('data-id'))
    var containerNewForm = null
    newLink.on('click', function (event){
      if(typeof newLink.attr('data-empty') === 'undefined'){
        event.preventDefault()
        $.get(newLink.attr('data-path'))
          .always(function () {
            if (containerNewForm !== null) {
              containerNewForm.remove()
            }
          })
          .done(function (data) {
            $('#comment-body-edit-'+newLink.attr('data-id')).html(data)
            newLink.attr('data-empty','false')
            containerNewForm = $('#comment-'+newLink.attr('data-id'))
            containerNewForm.find('#icap_blog_post_comment_form_message').attr('id', 'icap_blog_post_comment_form_message_'+newLink.attr('data-id'))
            $('#comment-body-edit-'+newLink.attr('data-id')).show()
            $('#comment-body-'+newLink.attr('data-id')).hide()
          })
      }
      else {
        $('#comment-body-edit-'+newLink.attr('data-id')).show()
        $('#comment-body-'+newLink.attr('data-id')).hide()
      }
    })
  })
})