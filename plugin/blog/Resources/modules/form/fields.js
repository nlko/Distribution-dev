/**
 * Created by david on 13/10/16.
 */
import $ from 'jquery'

$(document).ready( function(){

  /***************************************************************
   On utilise un masque de bits pour gérer l'ordre des widget.
   On a une paire par widget.

   Le premier numéro correspond à l'id de l'élément.
   Le second numéro correspond à la visibilité.

   L'id des elements : 0.Recherche / 1.Info bar / 2.Flux RSS /
   3.Nuage de tags / 4.Rédacteurs / 5.Calendrier / 6.Archives
   ****************************************************************/
  /*Order Option*/

  String.prototype.replaceAt=function(index, char) {
    return this.substr(0, index) + char + this.substr(index+char.length)
  }


  $( '#sortable' ).sortable({
    start: function(event, ui){
      var start_pos = ui.item.index()
      ui.item.data('start_pos', start_pos)
    },
    update: function (event, ui){
      var start_pos = ui.item.data('start_pos')
      var end_pos = ui.item.index()
      //Recuperation de la chaine dans le label
      var chaine = $( '#icap_blog_options_form_listWidgetBlog' ).val()

      //Modificaation du masque pour le déplacement
      var doubletteSelect=chaine.substr(start_pos*2,2)
      var chaineSansSousChaine = chaine.slice(0,(start_pos*2))+chaine.slice((start_pos*2)+2,chaine.length)
      var newChaine=chaineSansSousChaine.slice(0,end_pos*2)+doubletteSelect+chaineSansSousChaine.slice((end_pos*2),chaine.length)

      for(var pos_chaine=0; pos_chaine<newChaine.length; pos_chaine+=2 )
      {
        var index_enfant=(parseInt(newChaine.charAt(pos_chaine)))
        $('#panel'+index_enfant).appendTo($('.row aside.col-lg-4'))
      }

      $( '#icap_blog_options_form_listWidgetBlog' ).val(newChaine)
    }
  })

  /*Decalage calendrier*/
  if($('#panel5.hidden')){
    $('#panel5').removeClass('visible-lg')
  }
  else
  {
    $('#panel5').addClass('visible-lg')
  }



  /* Visibilité */

  $( '#sortable' ).disableSelection()


  //Fermer les yeux des options correspondant aux panels
  $( '.col-lg-4 .hidden').each(function()
  {
    //panel3 met class closed-eye au i et une opacité a 0.5 au papa

    var idPanel = $(this).attr('id')
    var finalNumberPanel = parseInt(idPanel.slice(-1))

    $('#option'+finalNumberPanel).prev().addClass('closed-eye')
    $('#option'+finalNumberPanel).parent().css({ opacity: 0.5 })
  })


  $( '.visibleWidgetSortable' ).click(function() {

    var idSelected = $(this).next().attr('id')
    var lastNumberId = idSelected[idSelected.length -1]
    var chainetmp =$( '#icap_blog_options_form_listWidgetBlog' ).val()
    for(var replace=1; replace<chainetmp.length; replace+=2)
    {
      chainetmp=chainetmp.replaceAt(replace, 'X')
    }
    var posId = chainetmp.indexOf(lastNumberId)


    var chaine1 = null
    var chaine2 = null
    if($(this).parent().css('opacity') == 1){
      chaine1 = $( '#icap_blog_options_form_listWidgetBlog' ).val().substr(0, posId+1)
      chaine2 = $( '#icap_blog_options_form_listWidgetBlog' ).val().substr(posId+2,14)
      $( '#icap_blog_options_form_listWidgetBlog' ).val(chaine1+'0'+chaine2)

      $(this).parent().animate({opacity:0.5}, 250)
      $(this).addClass('closed-eye')

      $('#panel'+lastNumberId).addClass('hidden')

    } else{
      chaine1 = $( '#icap_blog_options_form_listWidgetBlog' ).val().substr(0, posId+1)
      chaine2 = $( '#icap_blog_options_form_listWidgetBlog' ).val().substr(posId+2,14)
      $( '#icap_blog_options_form_listWidgetBlog' ).val(chaine1+'1'+chaine2)

      $(this).parent().animate({opacity:1}, 250)
      $(this).removeClass('closed-eye')

      $('#panel'+lastNumberId).removeClass('hidden')
    }
  })

})