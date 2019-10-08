import React, {Component} from 'react';

import "./Form.css";


class FormAction extends Component {
  state = {
    acts: [...this.props.user.activity],
    newAct : {
      act: "",
      score: "FREE"
    },
    formInvalid: true
  };
  formRef = React.createRef();

  handleChange = e => {
    const newAct = {...this.state.newAct };
    newAct[e.target.name] = e.target.value;
    this.setState({
      newAct,
      formInvalid: !this.formRef.current.checkValidity()
    });
  };
  addAct = async (e) => {
    e.preventDefault();
    if (!this.formRef.current.checkValidity()) return;
    await this.updateActions(this.state.acts, this.props.user._id);
    await this.setState(state => ({
      acts: [...state.acts, state.newAct],
      newAct: {act: '', score: 'FREE'}
    }))
  };
  removeAct = async (index,user) => {
    const acts = this.state.acts;
    acts.splice(index, 1);
    await this.updateActions(acts, user);
    this.setState({ acts })
  };
  updateActions = (act , idx) => {
    return fetch(`/api/updateAction/${idx}`, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(...act)
    }).then(res=>{res.json()})
  };

  render() {
    return (
      <section>
        <hr />
        {this.state.acts.map((s, idx) => (
          <article key={idx}>
            <div>{s.act}</div> <div>{s.score}</div>
            <button class="formBtn" onClick={() => this.removeAct(idx,this.props.user._id)}>X</button>
          </article>
           
        ))}
        <hr />
        <form ref={this.formRef} onSubmit={this.addAct}>
          <label>
            <span>></span>
            <input 
              name='act' 
              value={this.state.newAct.act}
              onChange={this.handleChange}
              required 
                pattern='.{2,}'
            />
          </label>
          <label>
            <span>$</span>
            <select 
              name='score' 
              value={this.state.newAct.score}
              onChange={this.handleChange}  
            >
              <option value="FREE">FREE</option>
              <option value="$1">$1</option>
              <option value="$5">$5</option>
              <option value="$10">$10</option>
              <option value="$20">$20</option>
              <option value="$50">$50</option>
            </select>
          </label>
          <button 
            disabled={this.state.formInvalid}  
          >ADD ACTIVITY</button>
        </form>
      </section>
    );
  }
}



export default FormAction