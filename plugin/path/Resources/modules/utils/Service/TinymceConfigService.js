/**
 * TinyMCE config
 */

export default function tinymceConfig() {
  // Initialize TinyMCE
  let tinymce = window.tinymce
  tinymce.claroline.init    = tinymce.claroline.init || {}
  tinymce.claroline.plugins = tinymce.claroline.plugins || {}

  let plugins = [
    'autoresize advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars fullscreen',
    'insertdatetime media nonbreaking save table directionality',
    'template paste textcolor emoticons code -accordion -mention -codemirror'
  ]

  let toolbar = 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | fullscreen displayAllButtons'

  $.each(tinymce.claroline.plugins, function (key, value) {
    if ('autosave' != key && value === true) {
      plugins.push(key)
      toolbar += ' ' + key
    }
  })

  const config = {}
  for (let prop in tinymce.claroline.configuration) {
    if (tinymce.claroline.configuration.hasOwnProperty(prop)) {
      config[prop] = tinymce.claroline.configuration[prop]
    }
  }

  config.plugins = plugins
  config.toolbar1 = toolbar
  config.trusted = true
  config.format = 'html'

  return config;
}
