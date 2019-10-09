import React, {Component} from 'react';
// import userService from "../../utils/userService";
import "./Form.css";
// import { async } from 'q';

class FormAction extends Component {
  state = {
    acts: this.props.user.activity,
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
    await this.setState(state => ({
      acts: [...state.acts, state.newAct],
      newAct: {act: '', score: 'FREE'}
    }))
    await this.props.updateActions(this.state.acts);
  };
  removeAct = async (index) => {
    const acts = this.state.acts;
    acts.splice(index, 1);
    this.setState({ acts })
    await this.props.updateActions(acts);
  };


  render() {
    
    return (
      <section>
        <hr />
        {this.state.acts.map((s, idx) => (
          <article key={idx}>
            <div>{s.act}</div> 
            <div>{s.score}</div>
            <button class="formBtn" onClick={() => this.removeAct(idx)}>X</button>
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
            className="submit"
            disabled={this.state.formInvalid}  
          >ADD ACTIVITY</button>
        </form>
      </section>
    );
  }
}



export default FormAction