import React, {Component} from 'react'
import Collapse from 'react-bootstrap/lib/Collapse'
import {Field, reduxForm} from 'redux-form'
import {t, tex} from './../lib/translate'
import Controls from './form-controls.jsx'

const T = React.PropTypes
const id = (field, itemId) => `item-${itemId}-field-${field}`

const Metadata = props =>
  <fieldset>
    <Field
      name="title"
      component={Controls.Text}
      label={t('title')}
    />
    <Field
      id={id('description', props.itemId)}
      name="description"
      component={Controls.Textarea}
      label={t('description')}
    />
    <Field
      id={id('instruction', props.itemId)}
      name="specification"
      component={Controls.Textarea}
      label={tex('instruction')}
    />
    <Field
      id={id('info', props.itemId)}
      name="supplementary"
      component={Controls.Textarea}
      label={tex('additional_info')}
    />
  </fieldset>

Metadata.propTypes = {
  itemId: T.string.isRequired
}

const Interact = props =>
  <fieldset>
    <Field
      id={id('feedback', props.itemId)}
      name="feedback"
      component={Controls.Textarea}
      label={tex('feedback')}
    />
  </fieldset>

Interact.propTypes = {
  itemId: T.string.isRequired
}

class ItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      metaHidden: true,
      feedbackHidden: true,
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(values => {})}>
        <Field
          id={id('question', this.props.id)}
          name="invite"
          component={Controls.Textarea}
          label={tex('question')}
        />
        <Controls.CollapsibleSection
          hidden={this.state.metaHidden}
          showText={tex('show_metadata_fields')}
          hideText={tex('hide_metadata_fields')}
          toggle={() => this.setState({metaHidden: !this.state.metaHidden})}
        >
          <Metadata itemId={this.props.id}/>
        </Controls.CollapsibleSection>
        <hr/>
        {this.props.children}
        <hr/>
        <Controls.CollapsibleSection
          hidden={this.state.feedbackHidden}
          showText={tex('show_interact_fields')}
          hideText={tex('hide_interact_fields')}
          toggle={() => this.setState({feedbackHidden: !this.state.feedbackHidden})}
        >
          <Interact itemId={this.props.id}/>
        </Controls.CollapsibleSection>
      </form>
    )
  }
}

// TODO: update field names (specification, supplementary, etc.)
// Missing: categories, hints

ItemForm.propTypes = {
  id: T.string.isRequired,
  initialValues: T.object.isRequired
}

ItemForm = reduxForm({
  form: 'item-properties'
})(ItemForm)

export {ItemForm}
