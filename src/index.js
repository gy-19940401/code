import ReactDOM from "react-dom";
import React from "react";
import Detail from "./js/detail"
import "./css/index.css";


class List extends React.Component {
  constructor(props) {
    super(props);
    this.delData = this.delData.bind(this);
    this.change = this.change.bind(this);
    this.edit = this.edit.bind(this);
  }
  edit(e) {
    let index = e.target.getAttribute("data-index");
    let arr = this.props.edit(index);
    console.log(arr);
    
  }
  delData(e) {
    let index = e.target.getAttribute("data-index");
    this.props.del(index);
  }
  change(e) {
    let index = e.target.getAttribute("data-index");
    this.props.change(index);
  }
  chang() { }
  show(list, bol) {
    return list.map((li, index) => {
      return (
        li.done === bol && (
          <li key={index}>
            <input type="checkbox" data-index={index} onClick={this.change} checked={bol} disabled={bol} onChange={this.chang}></input>
            {li.goal}
            <a href="#" data-index={index} onClick={this.edit}>编辑</a>
            <a href="#" data-index={index} onClick={this.delData}>删除</a>
          </li>
        )
      )
    })
  }
  render(bol) {
    return this.show(this.props.tolist, this.props.done);
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    list: [],
    detail:null
  }
  "use strict";
  componentDidMount() {
    let local = this.getData()
    this.setState({ list: local });
  }
  //设置目标
  addItem() {
    let value = this.state.goal;
    if (value === undefined || value.trim() === "") {
      alert("空目标！！！！")
    }
    else {
      let local = this.getData();
      local.unshift({ goal: value, done: false })
      console.log(local)
      console.log(JSON.stringify(local));
      this.setData(local);
      this.setState({ list: local })
    }
  }
  //编辑目标
  editGoal = (index) => {
    // console.log(index);
    let local = this.getData();
    // console.log(local[index]);
    // detail(local[index]);
    this.setState({detail:<Detail data={local[index],index}></Detail>})
    
  }

  //删除目标
  deleData = (index) => {
    // console.log("fu"+index);
    let local = this.getData();
    local.splice(index, 1);
    this.setData(local);
    this.setState({ list: local })
  }
  //完成目标
  check = (index) => {
    // console.log(index);
    let local = this.getData();
    local[index].done = true;
    this.setData(local);
    this.setState({ list: local })
  }
  getValue(e) {
    this.setState({ goal: e.target.value })
  }
  //获取本地存储
  getData() {
    let local = localStorage.getItem("goal")
    if (local === null)
      return [];
    else
      return JSON.parse(local);
  }
  //写入本地存储
  setData(local) {
    localStorage.setItem("goal", JSON.stringify(local))
  }

  render() {
    return (
      <div id="con">
        <div className="newGoal">
          <span>新的目标: </span>
          <input type='text' placeholder="写下你的目标" value={this.state.goal || ""} onChange={this.getValue.bind(this)} />
          <button onClick={this.addItem.bind(this)}>确定</button>
        </div>
        {(this.state.detail!==null)?(this.state.detail):(null)}
        <ul className="doing">
          <h3>未完成</h3>
          <List
            additem={this.state.item}
            tolist={this.state.list}
            done={false}
            del={this.deleData}
            change={this.check}
            edit={this.editGoal}
          />
        </ul>
        <ul className="doing">
          <h3>未完成</h3>
          <List
            additem={this.state.item}
            tolist={this.state.list}
            done={true}
            del={this.deleData}
            change={this.check}
            edit={this.editGoal}
          />
        </ul>

      </div>

    )
  }
}

ReactDOM.render(<Todos />, document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

