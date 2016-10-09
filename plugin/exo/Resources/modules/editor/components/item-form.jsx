import React, {Component} from 'react'
import Collapse from 'react-bootstrap/lib/Collapse'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {t, tex} from './../lib/translate'
import {makeId} from './../util'
import Controls from './form-controls.jsx'

const T = React.PropTypes
const id = (field, itemId) => `item-${itemId}-field-${field}`

export const ITEM_FORM = 'item-properties'

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

const Hint = props =>
  <div className="hint-item">
    <div className="hint-value">
      <Field
        id={`${props.name}.data`}
        name={`${props.name}.data`}
        title={tex('hint')}
        component={Controls.Textarea}
      />
    </div>
    <Field
      name={`${props.name}.penalty`}
      className="form-control hint-penalty"
      title={tex('penalty')}
      component="input"
      type="number"
      min="0"
    />
    <span
      role="button"
      title={t('delete')}
      className="fa fa-trash-o"
      onClick={props.onRemove}
    />
  </div>

const Hints = props =>
  <div className="hint-items">
    <label
      className="control-label"
      htmlFor="hint-list"
    >
      {tex('hints')}
    </label>
    {props.fields.length === 0 &&
      <div className="no-hint-info">
        Aucun indice n'est associé à cette question.
      </div>
    }
    <ul id="hint-list">
      {props.fields.map((hint, index) =>
        <li key={hint}>
          <Hint
            name={hint}
            onRemove={() => props.fields.remove(index)}
          />
        </li>
      )}
      <div className="footer">
        <button
          className="btn btn-default"
          onClick={() => props.fields.push({id: makeId(), penalty: 0})}
        >
          <span className="fa fa-plus"/>
          &nbsp;{tex('add_hint')}
        </button>
      </div>
    </ul>
  </div>

const Interact = props =>
  <fieldset>
    <FieldArray
      name="hints"
      component={Hints}
    />
    <hr/>
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
// Missing: categories, objects, resources

ItemForm.propTypes = {
  id: T.string.isRequired,
  initialValues: T.object.isRequired
}

ItemForm = reduxForm({
  form: ITEM_FORM
})(ItemForm)

export {ItemForm}
