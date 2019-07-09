import React from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import Form from "react-jsonschema-form";

import * as actions from "./actions.js";

const URL = "https://api-js401.herokuapp.com";

const uiSchema = {
  _id: { "ui:widget": "hidden" },
  __v: { "ui:widget": "hidden" }
};

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: {} };
  }

  async componentDidMount() {
    let url = `${URL}/api/v1/${this.props.model}/schema`;
    let schema = await superagent.get(url).then(result => result.body);
    this.setState({ schema });
  }

  resetPlayer = id => {
    this.setState({ id: null });
  };

  handleSubmit = form => {
    let formData = form.formData;
    let url = `${URL}/api/v1/${this.props.model}`;

    if (parseInt(this.props.id) >= 0) {
      this.props.handlePut({
        url: url,
        id: this.props.id,
        model: this.props.model,
        record: formData
      });
    } else {
      this.props.handlePost({
        url: url,
        model: this.props.model,
        record: formData
      });
    }
  };

  render() {
    return (
      <div>
        <h3>Edit Record {this.props.id}</h3>
        <Form
          schema={this.state.schema}
          uiSchema={uiSchema}
          formData={this.props.records[this.props.model][this.props.id]}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: payload => dispatch(actions.postResource(payload)),
  handlePut: payload => dispatch(actions.put(payload)),
  handlePatch: payload => dispatch(actions.patch(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);
