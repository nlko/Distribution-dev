import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {t, tex} from './../lib/translate'
import Controls from './form-controls.jsx'

const id = (field, itemId) => `item-${itemId}-field-${field}`

class ItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {metaHidden: true}
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(values => {})}>
        <Field
          id={id('question', this.props.id)}
          name="question"
          component={Controls.Textarea}
          label={tex('question')}
        />

        <button onClick={() => this.setState({metaHidden: !this.state.metaHidden})}>
          {this.state.metaHidden ? 'Meta' : 'Hide'}
        </button>

        {!this.state.metaHidden &&
          <fieldset>
            <Field
              name="title"
              component={Controls.Text}
              label={t('title')}
            />
            <Field
              id={id('description', this.props.id)}
              name="description"
              component={Controls.Textarea}
              label={t('description')}
            />
            <Field
              id={id('instruction', this.props.id)}
              name="instruction"
              component={Controls.Textarea}
              label={tex('instruction')}
            />
            <Field
              id={id('info', this.props.id)}
              name="info"
              component={Controls.Textarea}
              label={tex('additional_info')}
            />
          </fieldset>
        }
      </form>
    )
  }
}

// Missing: categories, hints, feedback

const T = React.PropTypes

ItemForm.propTypes = {
  id: T.string.isRequired,
  initialValues: T.object.isRequired
}

ItemForm = reduxForm({
  form: 'item-properties'
})(ItemForm)

export {ItemForm}
